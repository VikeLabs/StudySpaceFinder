from typing import List
from fastapi import HTTPException
from models import Building, RoomSummary, BuildingSummary

from services.db import DbServices


def get_building_names() -> List[Building]:
    db = DbServices()
    data = db.cursor.execute(
        """
        SELECT * FROM buildings ORDER BY name ASC;
        """
    ).fetchall()
    return [Building(id=k[0], name=k[1].replace("&amp;", "and")) for k in data]


def get_building_at_time(
    bldg_id: int, hour: int, minute: int, day: str
) -> BuildingSummary:
    db = DbServices()
    seconds = hour * 3600 + minute * 60

    try:
        # get building name
        building_name = db.cursor.execute(
            "SELECT name FROM buildings WHERE id=?", (bldg_id,)
        ).fetchone()[0]

        # get all rooms
        rooms = db.cursor.execute(
            """
            SELECT 
                rooms.id,
                rooms.room 
            FROM rooms 
                JOIN buildings 
                    ON rooms.building_id=buildings.id 
            WHERE buildings.id=?;
            """,
            (bldg_id,),
        ).fetchall()

        if rooms is None:
            raise HTTPException(404, "Building not found.")

        # get all classes
        out = list()
        for room in rooms:
            (room_id, room_name) = room
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
                    AND {day}=true
                    AND time_start_int>?
                ORDER BY time_start_int ASC
                LIMIT 1;
                """,
                (room_id, seconds),
            )

            result = query.fetchone()
            if result is None:
                out.append(
                    RoomSummary(
                        room_id=room_id,
                        room=room_name,
                        next_class="11:00pm",
                        subject=None,
                    )
                )
                continue

            (time_start, room_id, room, subject) = result
            out.append(
                RoomSummary(
                    room_id=room_id,
                    room=room_name,
                    next_class=time_start,
                    subject=subject,
                )
            )

        return BuildingSummary(building=building_name, data=out)
    finally:
        db.cursor.close()
