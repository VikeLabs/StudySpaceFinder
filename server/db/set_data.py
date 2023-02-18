import json
import os
from models.subjects import subject_table

from services.db import DbServices


path = os.path.join("db", "data.json")


def save_data():
    with open(path) as f:
        db = DbServices().connect()
        fetched_data = json.load(f)

        data = list()
        for i in fetched_data:
            subject = i["subject"]
            desc = i["subjectDescription"]
            data.append({"subject": subject, "description": desc})

        # Subject
        db.execute(subject_table.insert().values(data))
        db.close()
