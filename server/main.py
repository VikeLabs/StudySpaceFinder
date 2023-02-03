import json
from urllib import parse
from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from util.load_resource import load_resource

app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["GET"]
)


@app.get("/api/all", status_code=200)
def get_all_building_names():
    file_path = "./data/building_time_intervals_0.1.json"

    try:
        data = load_resource(file_path)
        return data

    except Exception as e:
        print(f"[ERROR] {e}")
        raise (HTTPException(status_code=500))


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

    try:
        data = load_resource(file_path)
        building = data.get(b)

        if not building:
            print("[{}] not found".format(b))
            raise HTTPException(status_code=404)

        return building

    except Exception as e:
        print(f"[ERROR] {e}")
        raise (HTTPException(status_code=500))
