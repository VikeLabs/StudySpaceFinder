import json
import sys
from util.fetch_sections import fetch_sections
from util.get_active_day import get_active_day
from util.spf_time import (
    time_to_second,
    get_time_index,
    occupied_range,
    generate_time_intervals,
)


def get_all_sections(term: str):
    out = dict()
    offset: int = 1

    section_fetched_count: int
    fetched = 0

    print("Fetching")

    while True:
        # fetching
        res = fetch_sections(term, offset)
        offset += 1  # for the next offset

        data = res["data"]
        section_fetched_count = res["sectionsFetchedCount"]
        fetched += len(data)
        print("Received: {}/{}".format((fetched), (section_fetched_count)))

        if len(data) == 0 or data == None:
            print(f"Done, received {section_fetched_count}")
            break

        # parsing
        for i in data:
            subject_course = i["subjectCourse"]

            meetings_faculty = i["meetingsFaculty"]
            for j in meetings_faculty:
                meeting_time = j["meetingTime"]

                building_description = meeting_time["buildingDescription"]
                if building_description == None:
                    continue

                if not out.get(building_description):
                    out[building_description] = dict()

                room = meeting_time["room"]
                if room == None:
                    continue

                if not out[building_description].get(room):
                    out[building_description][room] = dict()

                begin_time = meeting_time["beginTime"]
                end_time = meeting_time["endTime"]

                if begin_time == None or end_time == None:
                    continue

                active_days = get_active_day(meeting_time)
                for day in active_days:
                    if not out[building_description][room].get(day):
                        out[building_description][room][day] = list()

                    out[building_description][room][day].append(
                        {
                            "class": subject_course,
                            "time_start": begin_time,
                            "time_end": end_time,
                        }
                    )
    return out


def get_time_occupied(uvic):
    out = dict()

    for bldg in uvic.keys():
        out[bldg] = dict()

        for room in uvic[bldg].keys():
            out[bldg][room] = dict()

            for day in uvic[bldg][room].keys():
                time_intervals = generate_time_intervals()
                occupied_index = list()

                for session in uvic[bldg][room][day]:
                    occupied_index = occupied_index + occupied_range(
                        session["time_start"], session["time_end"]
                    )

                for i in occupied_index:
                    time_intervals[i] = False

                out[bldg][room][day] = time_intervals

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
    with open("data.json", "w+") as f:
        f.write(json.dumps(data, indent=2))
        print("Generated data.json")

    # generate time_bool array data
    out = get_time_occupied(data)
    with open("time_bool_array.json", "w+") as f:
        f.write(json.dumps(out, indent=2))
        print("Generated time_bool_array.json")
