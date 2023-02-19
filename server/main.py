from typing import List
from urllib import parse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services import building_services

app = FastAPI()

origins = [
    "http://localhost:3000",
    # TODO: deployed url here
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET"])


@app.get(
    "/api/building/all",
    status_code=200,
    response_model=List[building_services.Building],
)
def serve_all_building_names():
    return building_services.get_all()


# ie: /api/building/1?hour=13&minute=30&day=1
@app.get("/api/building/{bldg_id}", status_code=200)
def serve_all_rooms(bldg_id: int, hour: int, minute: int, day: int):
    allowed_day = [1, 2, 3, 5, 6, 7]
    if day not in allowed_day:
        raise HTTPException(status_code=400, detail=f"invalid day {day}")

    data = building_services.get_building_at_time(bldg_id, hour, minute, day)
    return data


# ie: /Cornett%20Building
@app.get("/api/{bldg}", status_code=200)
def get_building_info(bldg: str):
    return []
