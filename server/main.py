import json
from urllib import parse
from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["GET"]
)


# ie: /Cornett%20Building/A120 - don't forget to encode whitespace for the url
@app.get("/{bldg}/{room}", status_code=200)
def get_room_info(bldg: str, room: str):
    bldg = parse.unquote(bldg)

    file_path = "./data/building_time_intervals_0.1.json"

    # read json
    uvic_bldg = open(file_path)
    data = json.load(uvic_bldg)
    uvic_bldg.close()

    building = data.get(bldg).get(room)
    if not building:
        print("[{}-{}] not found".format(bldg, room))
        raise HTTPException(status_code=404)

    return building


# ie: /Cornett%20Building
@app.get("/{bldg}", status_code=200)
def get_building_info(bldg: str):
    b = parse.unquote(bldg)
    file_path = "./data/building_time_intervals_0.1.json"

    with open(file_path) as f:
        data = json.load(f)
        building = data.get(b)

        if not building:
            print("[{}] not found".format(b))
            raise HTTPException(status_code=404)
        return building
