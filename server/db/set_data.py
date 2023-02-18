import json
import os
from sqlite3 import Cursor
from typing import Any, Dict, List
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

            if bldg_desc is None or meetings_faculty is None:
                continue

            try:
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


def set_data():
    with open(path) as f:
        db = DbServices()
        data = json.load(f)

        set_course(data, db.cursor)
        set_buildings(data, db.cursor)

        db.connection.commit()
        db.connection.close()
