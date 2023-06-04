from routers.rooms.models import RoomModel
from schemas import RoomSchedule, SessionDetail, RoomDetail


def get_room_details(room_id: int):
    with RoomModel(room_id) as db:
        meta_data = db.get_room_info()
        if not meta_data:
            return None

        schedules = RoomSchedule(
            Sunday=list(),
            Monday=list(),
            Tuesday=list(),
            Wednesday=list(),
            Thursday=list(),
            Friday=list(),
            Saturday=list(),
        )

        data = db.get_room_sessions()
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

            entry = SessionDetail(
                subject=subject,
                section=section,
                time_start=time_start,
                time_end=time_end,
            )

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

        return RoomDetail(building=meta_data[1], room=meta_data[0], schedules=schedules)
