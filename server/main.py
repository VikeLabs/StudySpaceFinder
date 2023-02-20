from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Building, BuildingSummary, RoomDetail
import services

app = FastAPI()

origins = [
    "http://localhost:3000",
    # TODO: deployed url here
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET"])


@app.get(
    "/api/building/all",
    status_code=200,
    response_model=List[Building],
)
def serve_building_names():
    return services.get_building_names()


# ie: /api/building/1?hour=13&minute=30&day=1
@app.get(
    "/api/building/{bldg_id}",
    status_code=200,
    response_model=BuildingSummary,
)
def serve_building_details(bldg_id: int, hour: int, minute: int, day: int):
    valid_day: bool = day in [0, 1, 2, 3, 5, 6]
    valid_hour: bool = 0 <= hour <= 24
    valid_minute: bool = 0 <= minute <= 60
    if not valid_day or not valid_hour or not valid_minute:
        raise HTTPException(status_code=400, detail=f"Invalid query")

    data: BuildingSummary = services.get_building_at_time(bldg_id, hour, minute, day)
    return data


@app.get("/api/room/{room_id}", status_code=200, response_model=List[RoomDetail])
def serve_room_details(room_id: int, status_code=200):
    return []
