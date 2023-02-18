from typing import List
from pydantic import BaseModel

from services.db import DbServices


class Building(BaseModel):
    id: int
    name: str


def get_all() -> List[Building]:
    db = DbServices()
    data = db.cursor.execute("SELECT * FROM buildings;").fetchall()
    out = [Building(id=k[0], name=k[1].replace("&amp;", "and")) for k in data]
    return out
