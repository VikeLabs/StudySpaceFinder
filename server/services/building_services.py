from typing import List, Dict
from fastapi import HTTPException
from models import Building, RoomSummary, BuildingSummary

from services.db import DbServices

DAY_MAP: Dict[int, str] = {
    0: "sunday",
    1: "monday",
    3: "tuesday",
    4: "wednesday",
    5: "thursday",
    6: "friday",
    7: "saturday",
}


def get_all() -> List[Building]:
    db = DbServices()
    data = db.cursor.execute("SELECT * FROM buildings;").fetchall()
    out = [Building(id=k[0], name=k[1].replace("&amp;", "and")) for k in data]
    return out


def get_building_at_time(
    bldg_id: int, hour: int, minute: int, day: int
) -> BuildingSummary:
    db = DbServices()
    query_day: str = DAY_MAP[day]
    seconds = hour * 3600 + minute * 60

    # get all rooms
    rooms = db.cursor.execute(
        """
        SELECT 
            rooms.id,
            buildings.name
        FROM rooms 
            JOIN buildings
                ON rooms.building_id=buildings.id
            WHERE building_id=?
        """,
        (bldg_id,),
    ).fetchall()

    if rooms is None:
        raise HTTPException(404, "Building not found.")

    building_name = rooms[0][1].replace("&amp;", "&")
    room_ids = tuple([k for (k, _) in rooms])

    # get all classes
    out = list()
    for room_id in room_ids:
        query = db.cursor.execute(
            f"""
            SELECT
                sections.time_start_str,
                rooms.id,
                rooms.room,
                subjects.subject
            FROM sections 
                JOIN rooms 
                    ON sections.room_id=rooms.id
                JOIN subjects
                    ON sections.subject_id=subjects.id
                WHERE sections.room_id=? 
                    AND {query_day}=true
                    AND time_start_int>?
                ORDER BY time_start_int ASC
                LIMIT 1;
            """,
            (room_id, seconds),
        )

        result = query.fetchone()
        if result is None:
            continue

        (time_start, room_id, room, subject) = result
        out.append(
            RoomSummary(id=room_id, room=room, next_class=time_start, subject=subject)
        )

    return BuildingSummary(building=building_name, data=out)
