import json
import os
from sqlite3 import Cursor
from typing import Any, Dict, List, Set, Tuple

from services.db import DbServices


path = os.path.join("db", "data.json")


def set_course(fetched_data: List[Dict[str, Any]], db: Cursor):
    data = list()
    for i in fetched_data:
        subject = i["subjectCourse"]
        desc = i["courseTitle"]
        data.append((subject, desc, subject, desc))

    db.executemany(
        """
        INSERT INTO subjects(subject, description)
            VALUES(?,?)
            ON CONFLICT DO UPDATE SET subject=?, description=?;
        """,
        data,
    )


def set_buildings(fetched_data: List[Dict[str, Any]], db: Cursor):
    data = set()
    for i in fetched_data:
        meetings_faculty: Any = i.get("meetingsFaculty")

        for j in meetings_faculty:
            meeting_time: Any = j.get("meetingTime")
            bldg_desc: str = meeting_time.get("buildingDescription")

            try:
                if bldg_desc:
                    data.add((bldg_desc, bldg_desc))
            except KeyError:
                continue

    db.executemany(
        """
        INSERT INTO buildings(name) 
        VALUES(?)
        ON CONFLICT DO UPDATE SET name=?;
        """,
        data,
    )


def set_rooms(fetched_data: List[Dict[str, Any]], db: Cursor):
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

            building_id = db.execute(
                "SELECT id FROM buildings WHERE name=?", (building_name,)
            ).fetchone()[0]
            try:
                data.add((room, building_id))
            except KeyError:
                continue

    db.executemany(
        """
        INSERT INTO rooms(room, building_id) VALUES(?, ?)
            ON CONFLICT DO NOTHING;
        """,
        data,
    )


def _time_str_to_int(time: str) -> int:
    hour = time[:2]
    min = time[2:]
    return int(hour) * 3600 + int(min) * 60


def _format_time_str(time: str) -> str:
    hour = int(time[:2])
    min = time[2:]
    prefix = "am"

    if hour > 12:
        hour = hour - 12
        prefix = "pm"

    return f"{hour}:{min} {prefix}"


def set_class_session(fetched_data: List[Dict[str, Any]], db: Cursor):
    data: List[Tuple] = list()
    for i in fetched_data:
        subject = i.get("subjectCourse")
        section = i["sequenceNumber"]
        subject_id = db.execute(
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

            building_id = db.execute(
                "SELECT id FROM buildings WHERE name=?", (building,)
            ).fetchone()[0]
            room_id = db.execute(
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

    db.executemany(
        f"""
        INSERT OR REPLACE INTO sections({",".join(value_insert)}) VALUES({",".join(params)});
        """,
        data,
    )


def set_data():
    with open(path) as f:
        db = DbServices()
        data = json.load(f)

        set_course(data, db.cursor)
        set_buildings(data, db.cursor)
        set_rooms(data, db.cursor)
        set_class_session(data, db.cursor)

        db.connection.commit()
