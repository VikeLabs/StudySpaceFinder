import time
from typing import List
from functions.db.get_data.banner.schemas import BannerSection
from functions.db.get_data.banner.client import BannerClient
from functions.db.get_data.sqlite.client import DB


def get_data():
    time_start = time.time()

    banner = BannerClient()

    print(f"Get latest term", end=" ")
    term = banner.get_latest_term()
    print(f"\t[ok] found {term.code} - {term.description}")

    print(f"\nSet term", end=" ")
    banner.set_term()
    print(f"\t\t[ok]")

    print("\nFetch data")
    offset = 0
    data: List[BannerSection] = list()
    while True:
        result = banner.get_data(offset)
        if result is None:
            break
        data = data + result
        offset += 1

    with DB(data) as db:
        # NOTE: don't change this insertion order
        print("\nDrop existing data")
        db.drop_existing_tables()
        print("\t\t\t[ok]")

        print("\nSave to db")

        print("\t\t\t[pending] subjects", end=" ")
        db.save_subjects()
        print("\t[ok]")

        print("\t\t\t[pending] buildings", end=" ")
        db.save_buildings()
        print("\t[ok]")

        print("\t\t\t[pending] rooms", end=" ")
        db.save_rooms()
        print("\t[ok]")

        print("\t\t\t[pending] sessions", end=" ")
        db.save_sessions()
        print("\t[ok]")

        print("\t\t\t[ok]")

    time_end = time.time()
    print(f"\n[done]\t\t\ttook {(time_end - time_start) * 1000}ms")
