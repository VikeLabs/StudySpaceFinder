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


class RoomSummary(BaseModel):
    room: str
    free_until: str


def get_building_at_time(bldg_id: int, hour: int, minute: int, day: int):
    seconds = hour * 3600 + minute * 60

    db = DbServices()

    # get all rooms
    rooms = db.cursor.execute(
        """
        SELECT id,room FROM rooms WHERE building_id=?
        """,
        (bldg_id,),
    ).fetchall()

    return [{"room_id": k, "room_name": v} for (k, v) in rooms]
