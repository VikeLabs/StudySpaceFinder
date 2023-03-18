from fastapi import HTTPException
from services.db import DbServices
from models import RoomDetail, RoomSchedule, SectionDetail


def get_room_details(room_id: int):
    with DbServices() as db:
        # Get location info (room and building)
        meta = db.cursor.execute(
            """
            SELECT
                rooms.room,
                buildings.name
            FROM rooms 
            JOIN buildings
                ON building_id=buildings.id
            WHERE rooms.id = ?
            """,
            (room_id,),
        ).fetchone()

        if not meta:
            raise HTTPException(status_code=404, detail="Room not found.")

        # Get all sections in the week of the room
        data = db.cursor.execute(
            f"""
            SELECT
                subjects.subject,
                sec.section,
                sec.time_start_str,
                sec.time_end_str,
                sec.sunday,
                sec.monday,
                sec.tuesday,
                sec.wednesday,
                sec.thursday,
                sec.friday,
                sec.saturday
            FROM sections as sec
            JOIN
                subjects
                    ON sec.subject_id = subjects.id
            WHERE
                sec.room_id = ?;
            """,
            (room_id,),
        ).fetchall()

        schedules = RoomSchedule(
            Sunday=list(),
            Monday=list(),
            Tuesday=list(),
            Wednesday=list(),
            Thursday=list(),
            Friday=list(),
            Saturday=list(),
        )

        for i in data:
            (
                subject,
                section,
                time_start,
                time_end,
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
            ) = i

            entry = SectionDetail(
                subject=subject,
                section=section,
                time_start=time_start,
                time_end=time_end,
            )

            """
            entry = {
                "subject": subject,
                "section": section,
                "time_start": time_start,
                "time_end": time_end,
            }
            """

            if sunday:
                schedules.Sunday.append(entry)
            if monday:
                schedules.Monday.append(entry)
            if tuesday:
                schedules.Tuesday.append(entry)
            if wednesday:
                schedules.Wednesday.append(entry)
            if thursday:
                schedules.Thursday.append(entry)
            if friday:
                schedules.Friday.append(entry)
            if saturday:
                schedules.Saturday.append(entry)

        return RoomDetail(building=meta[1], room=meta[0], schedules=schedules)
