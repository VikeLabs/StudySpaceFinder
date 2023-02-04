import json
import sys
from util.fetch_sections import fetch_sections
from util.get_active_day import get_active_day


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

    with open("data.json", "w+") as f:
        f.write(json.dumps(out, indent=2))

    print("Generated data.json")


if __name__ == "__main__":
    term: str
    try:
        term = sys.argv[1]
    except IndexError:
        print(f"missing term arg, ie: 202301")
        quit()

    # generate data.json
    get_all_sections(term)
