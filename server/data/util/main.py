import json
import requests
import sys
from util.fetch_sections import BANNER, search_result_url
from util.get_active_day import get_active_day
from util.spf_time import (
    occupied_range,
    generate_time_intervals,
)

"""Call this script to generate all the needed data
ie: python main.py 202301
"""


def get_all_sections(term: str):
    out = dict()
    offset: int = 0

    section_fetched_count: int
    fetched = 0

    # set term
    print("Setting term {}".format(term))
    url = f"{BANNER}/term/search?mode=search"
    payload = {"term": term}
    s = requests.Session()
    s.post(url, data=payload)
    print("Done")

    # fetch and process data
    print("Fetching")
    print("Progress: 0%")
    while True:
        # fetching
        url = search_result_url(offset)

        res = s.get(url)

        if res.status_code != 200:
            raise Exception(f"Banner responded with {res.status_code}")

        res = res.json()
        offset += 1  # for the next offset

        data = res["data"]
        section_fetched_count = res["sectionsFetchedCount"]
        fetched += len(data)

        if len(data) == 0 or data == None:
            print(f"Done, received {section_fetched_count} entries.")
            break

        print("Progress: {:.2f}%".format((fetched * 100) / (section_fetched_count)))

        # parsing
        for i in data:
            subject_course = i["subjectCourse"]

            meetings_faculty = i["meetingsFaculty"]
            for j in meetings_faculty:
                meeting_time = j["meetingTime"]

                building_id = meeting_time["building"]
                building_description = meeting_time["buildingDescription"]
                if building_description == None:
                    continue
                else:
                    building_description = building_description.replace("&amp;", "and")

                if not out.get(building_id):
                    out[building_id] = dict()
                    out[building_id]["building_description"] = building_description
                    out[building_id]["rooms"] = dict()

                room = meeting_time["room"]
                if room == None:
                    continue

                if not out[building_id]["rooms"].get(room):
                    out[building_id]["rooms"][room] = dict()

                begin_time = meeting_time["beginTime"]
                end_time = meeting_time["endTime"]

                if begin_time == None or end_time == None:
                    continue

                active_days = get_active_day(meeting_time)
                for day in active_days:
                    if not out[building_id]["rooms"][room].get(day):
                        out[building_id]["rooms"][room][day] = list()

                    out[building_id]["rooms"][room][day].append(
                        {
                            "class": subject_course,
                            "time_start": begin_time,
                            "time_end": end_time,
                        }
                    )
    return out


def get_time_occupied(uvic):
    out = dict()

    for bldg_id in uvic.keys():
        out[bldg_id] = dict()
        out["building_description"] = uvic[bldg_id]["building_description"]

        for room in uvic[bldg_id]["rooms"].keys():
            out[bldg_id][room] = dict()

            for day in uvic[bldg_id]["rooms"][room].keys():
                time_intervals = generate_time_intervals()
                occupied_index = list()

                for session in uvic[bldg_id]["rooms"][room][day]:
                    occupied_index = occupied_index + occupied_range(
                        session["time_start"], session["time_end"]
                    )

                for i in occupied_index:
                    time_intervals[i] = False

                out[bldg_id][room][day] = time_intervals

    return out


if __name__ == "__main__":
    term: str
    try:
        term = sys.argv[1]
    except IndexError:
        print(f"missing term arg, ie: 202301")
        quit()

    # generate data.json
    data = get_all_sections(term)
    with open("../data.json", "w+") as f:
        f.write(json.dumps(data, indent=2))
        print("Generated data.json")

    # generate time_bool array data
    out = get_time_occupied(data)
    with open("../time_bool_array.json", "w+") as f:
        f.write(json.dumps(out, indent=2))
        print("Generated time_bool_array.json")
