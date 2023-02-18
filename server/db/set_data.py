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


def set_data():
    with open(path) as f:
        db = DbServices()
        data = json.load(f)

        set_course(fetched_data=data, db=db.cursor)

        db.connection.commit()
        db.connection.close()
