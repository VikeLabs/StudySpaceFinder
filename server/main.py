import json
from urllib import parse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from util.load_resource import load_resource

app = FastAPI()

origins = [
    "http://localhost:3000",
    # TODO: deployed url here
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET"])


@app.get("/api/all", status_code=200)
def get_all_building_names():
    file_path = "./data/data.json"

    try:
        data = load_resource(file_path)
        return data

    except Exception as e:
        print(f"[ERROR] {e}")
        raise (HTTPException(status_code=500))


# ie: /Cornett%20Building/A120 - don't forget to encode whitespace for the url
@app.get("/api/{bldg}/{room}", status_code=200)
def get_room_info(bldg: str, room: str):
    bldg = parse.unquote(bldg)
    file_path = "./data/time_bool_array.json"

    try:
        f = load_resource(file_path)
        data = json.load(f)

        building = data.get(bldg).get(room)
        if not building:
            print(f"[{bldg}-{room}] not found")
            raise HTTPException(status_code=404)

        return building

    except Exception as e:
        print(f"[ERROR] {e}")
        raise HTTPException(status_code=500)


# ie: /Cornett%20Building
@app.get("/api/{bldg}", status_code=200)
def get_building_info(bldg: str):
    b = parse.unquote(bldg)
    file_path = "./data/time_bool_array.json"

    try:
        data = load_resource(file_path)
        building = data.get(b)

        if not building:
            print(f"[{b}] not found")
            raise HTTPException(status_code=404)

        return building

    except Exception as e:
        print(f"[ERROR] {e}")
        raise (HTTPException(status_code=500))