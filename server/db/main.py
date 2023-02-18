import json
import requests
import sys
from fetch_sections import BANNER, search_result_url

"""Call this script to generate all the needed data
ie: python main.py 202301
"""


def get_all_sections(term: str):
    out = list()
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

        out = out + data

    return out


if __name__ == "__main__":
    term: str
    try:
        term = sys.argv[1]
    except IndexError:
        print(f"missing term arg, ie: 202301")
        quit()

    data = get_all_sections(term)

    with open("data.json", "w+") as f:
        f.write(json.dumps(data, indent=2))
