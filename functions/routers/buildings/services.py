from typing import List, Dict, Optional
from functions.routers.buildings.models import BuildingModels
from functions.lib.get_next_class import get_next_class

from functions.schemas import Building, RoomSummary, Session, BuildingSummary

DAY_MAP: Dict[int, str] = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
}


def get_all_buildings() -> Optional[List[Building]]:
    with BuildingModels() as db:
        result = db.get_all_buildings()

        if result is None:
            return None

        return [
            Building(id=id, name=name.replace("&amp;", "&")) for (id, name) in result
        ]


def get_building_schedules(
    bldg_id: int, hour: int, minute: int, weekday: int
) -> Optional[BuildingSummary]:
    current_time = hour * 3600 + minute * 60
    with BuildingModels() as db:
        bldg_result = db.get_building_name(bldg_id)
        if not bldg_result:
            return None

        bldg_name = bldg_result[0].replace("&amp;", "&")

        rooms = db.get_building_rooms(bldg_id)
        out = list()

        for room in rooms:
            (room_id, room_name) = room
            room_results = db.get_room_schedule(room_id, DAY_MAP[weekday])
            if not room_results:
                out.append(
                    RoomSummary(
                        room_id=room_id,
                        room=room_name,
                        next_class=None,
                        subject=None,
                    )
                )
                continue

            payload = [
                Session(
                    time_start_str=time_start_str,
                    room_id=room_id,
                    room=room,
                    subject=subject,
                    time_start_int=time_start_int,
                    time_end_int=time_end_int,
                )
                for (
                    time_start_str,
                    room_id,
                    room,
                    subject,
                    time_start_int,
                    time_end_int,
                ) in room_results
            ]

            next_class = get_next_class(payload, current_time)
            if next_class:
                out.append(next_class)

        return BuildingSummary(building=bldg_name, data=out)
