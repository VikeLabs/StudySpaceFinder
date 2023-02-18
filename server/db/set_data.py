import json
import os
from sqlite3 import Cursor
from typing import Any, Dict, List, Set, Tuple

from pydantic import BaseModel
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
        INSERT INTO rooms(room, building_id) VALUES(?, ?);
        """,
        data,
    )


def set_class_session(fetched_data: List[Dict[str, Any]], db: Cursor):
    class RoomInfo(BaseModel):
        room: str
        building: str
        id: int

    data = list()

    for i in fetched_data:
        subject = i.get("subjectCourse")
        section = i.get("sequenceNumber")
        meetings_faculty = i.get("meetingsFaculty")
        pass


def set_data():
    with open(path) as f:
        db = DbServices()
        data = json.load(f)

        set_course(data, db.cursor)
        set_buildings(data, db.cursor)
        set_rooms(data, db.cursor)

        db.connection.commit()
