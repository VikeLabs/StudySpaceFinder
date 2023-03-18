import json
import sys
import requests
import time
from typing import Any, Dict, List, Set, Tuple
from urllib import parse

from services.db import DbServices

_BANNER_BASE = "https://banner.uvic.ca/StudentRegistrationSsb/ssb/"


def _search_result_url(offset: int, term: str) -> str:
    base = parse.urljoin(_BANNER_BASE, "searchResults/searchResults")
    q = {"txt_term": term, "pageOffset": f"{offset * 500}", "pageMaxSize": "500"}

    return f"{base}?{parse.urlencode(q)}"


def set_subjects(fetched_data: List[Dict[str, Any]], db: DbServices):
    data = list()
    for i in fetched_data:
        subject = i["subjectCourse"]
        desc = i["courseTitle"]
        data.append((subject, desc, subject, desc))

    db.cursor.executemany(
        """
        INSERT INTO subjects(subject, description)
            VALUES(?,?)
            ON CONFLICT DO UPDATE SET subject=?, description=?;
        """,
        data,
    )

    db.connection.commit()


def set_buildings(fetched_data: List[Dict[str, Any]], db: DbServices):
    data = set()
    for i in fetched_data:
        meetings_faculty: Any = i.get("meetingsFaculty")

        for j in meetings_faculty:
            meeting_time: Any = j.get("meetingTime")
            bldg_desc: str = meeting_time.get("buildingDescription")

            try:
                if bldg_desc:
                    data.add((bldg_desc,))
            except KeyError:
                continue

    db.cursor.executemany(
        """
        INSERT INTO buildings(name) 
            VALUES(?)
            ON CONFLICT DO NOTHING;
        """,
        data,
    )

    db.connection.commit()


def set_rooms(fetched_data: List[Dict[str, Any]], db: DbServices):
    data: Set[Tuple] = set()
    for i in fetched_data:
        meetings_faculty = i.get("meetingsFaculty")

        if meetings_faculty is None:
            continue

        for j in meetings_faculty:
            meeting_time = j.get("meetingTime")
            room = meeting_time.get("room")
            if room is None or room == "LAB":
                continue

            building_name = meeting_time["buildingDescription"]
            if building_name is None:
                continue

            building_id = db.cursor.execute(
                "SELECT id FROM buildings WHERE name=?", (building_name,)
            ).fetchone()[0]
            try:
                data.add((room, building_id))
            except KeyError:
                continue

    db.cursor.executemany(
        """
        INSERT INTO rooms(room, building_id) VALUES(?, ?)
            ON CONFLICT DO NOTHING;
        """,
        data,
    )

    db.connection.commit()


def _time_str_to_int(time: str) -> int:
    hour = time[:2]
    min = time[2:]
    return int(hour) * 3600 + int(min) * 60


def _format_time_str(time: str) -> str:
    hour = int(time[:2])
    min = int(time[2:])
    prefix = "am"

    noon = 12 * 60 * 60
    current_time = hour * 3600 + min * 60

    if current_time >= noon:  # 12:00 pm
        prefix = "pm"
    if current_time >= noon + 3600:  # 13:00 pm -> 1:00 pm
        hour -= 12

    return f"{hour}:{min:02} {prefix}"


def set_class_session(fetched_data: List[Dict[str, Any]], db: DbServices):
    data: List[Tuple] = list()
    for i in fetched_data:
        subject = i.get("subjectCourse")
        section = i["sequenceNumber"]
        subject_id = db.cursor.execute(
            "SELECT id FROM subjects WHERE subject=?", (subject,)
        ).fetchone()[0]

        meetings_faculty = i["meetingsFaculty"]
        for k in meetings_faculty:
            meeting_time = k["meetingTime"]
            building: int = meeting_time.get("buildingDescription")

            time_start_str: str = meeting_time["beginTime"]
            time_end_str: str = meeting_time["endTime"]

            try:
                time_start_int: int = _time_str_to_int(time_start_str)
                time_end_int: int = _time_str_to_int(time_end_str)
            except TypeError:  # in case time is null in json
                continue

            room = meeting_time.get("room")
            if not building or not room:
                continue

            building_id = db.cursor.execute(
                "SELECT id FROM buildings WHERE name=?", (building,)
            ).fetchone()[0]

            room_id = db.cursor.execute(
                "SELECT id FROM rooms WHERE (building_id=? AND room=?)",
                (building_id, room),
            ).fetchone()

            if not room_id:  # that weird LAB room in BEC building
                continue

            section_entry = (
                section,
                _format_time_str(time_start_str),
                _format_time_str(time_end_str),
                time_start_int,
                time_end_int,
                meeting_time["monday"],
                meeting_time["tuesday"],
                meeting_time["wednesday"],
                meeting_time["thursday"],
                meeting_time["friday"],
                meeting_time["saturday"],
                meeting_time["sunday"],
                subject_id,
                building_id,
                room_id[0],
            )

            data.append(section_entry)

    value_insert = [
        "section",
        "time_start_str",
        "time_end_str",
        "time_start_int",
        "time_end_int",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "subject_id",
        "building_id",
        "room_id",
    ]
    params = ["?" for _ in value_insert]

    db.cursor.executemany(
        f"""
        INSERT OR REPLACE INTO 
            sections({",".join(value_insert)}) 
            VALUES({",".join(params)});
        """,
        data,
    )

    db.connection.commit()


def get_data():
    term: str
    try:
        term = sys.argv[2]
    except IndexError:
        print("missing term: ie 202301")
        sys.exit()

    time_now = time.time()

    """ FETCHING DATA """
    print("\nSetting term for Banner")
    s = requests.Session()
    url = parse.urljoin(_BANNER_BASE, "term/search?mode=search")

    response = s.post(url, data={"term": term})
    if response.status_code != 200:
        print(
            f"\t[ERROR] failed to set term, Banner responded with a status code {response.status_code}"
        )
        sys.exit()

    print("\t[OK] BANNER term set to {}\n".format(term))

    print("Fetching data")
    data = list()
    offset = 0

    print("\t[PENDING] progress: 0%")
    while True:
        url = _search_result_url(offset, term)
        res = s.get(url)
        if res.status_code != 200:
            print(
                f"\t[ERROR] failed to fetch offset {offset}, BANNER responded with {res.status_code}"
            )
            sys.exit()

        res = res.json()
        offset += 1  # for the next offset

        section_fetched_count = res["sectionsFetchedCount"]

        if len(res["data"]) == 0 or res["data"] is None:
            print(f"\t[OK] received {len(data)}/{section_fetched_count} entries.\n")
            break

        data = data + res["data"]
        print(
            "\t[PENDING] progress: {}%".format(
                (len(data) * 100) // (section_fetched_count)
            )
        )

    with DbServices() as db:
        """DROPPING EXISTING DATA"""
        print("Drop existing data")
        table_to_delete = ["buildings", "rooms", "sections", "subjects"]
        for i in table_to_delete:
            try:
                db.cursor.execute(f"DELETE FROM {i}")
                db.connection.commit()
                print(f"\t[OK] droped data from table {i}")
            except Exception as e:
                print(f"\t[ERROR] failed to drop table {i}:\n\t{e}")

        """ SAVING NEW DATA """
        print("\nSaving to .database.db")
        func_map = {
            "subjects": set_subjects,
            "buildings": set_buildings,
            "rooms": set_rooms,
            "sessions": set_class_session,
        }

        for k, v in func_map.items():
            try:
                v(data, db)
                print(f"\t[PENDING] saved: {k}")
            except Exception as e:
                print(f"[ERROR] failed to save {k}:\n\t{e}")
                sys.exit()

        print("\t[OK] saved all data to `.database.db`")

        """ GENERATING BACKUP FILE """
        print("\nGenerating backup json")
        file_name = f"./config/db/backups/data_{term}.json"
        with open(file_name, "w+") as f:
            f.write(json.dumps(data, indent=2))
            print(f"\t[OK] generated {file_name}")

        print(f"\n[DONE] took {(time.time() - time_now) * 1000}ms")
