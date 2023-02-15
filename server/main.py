from urllib import parse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services import get_all_buildings, get_all_rooms
from util.load_resource import load_resource

app = FastAPI()

origins = [
    "http://localhost:3000",
    # TODO: deployed url here
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET"])


@app.get("/api/building/all", status_code=200)
def serve_all_building_names():
    return get_all_buildings()


# ie: /Cornett%20Building/A120 - don't forget to encode whitespace for the url
@app.get("/api/building/{bldg_id}/{day}", status_code=200)
def serve_all_rooms(bldg_id: str, day: str):
    bldg = parse.unquote(bldg_id)
    data = get_all_rooms(bldg, day)
    return data


# ie: /Cornett%20Building
@app.get("/api/{bldg}", status_code=200)
def get_building_info(bldg: str):
    file_path = "./data/time_bool_array.json"

    try:
        b = parse.unquote(bldg)
        data = load_resource(file_path)
        building = data.get(b)

        if building is None:
            print(f"[{b}] not found")
            raise HTTPException(status_code=404)

        return building

    except HTTPException:
        raise HTTPException(status_code=404)

    except Exception as e:
        print(f"[ERROR] {e}")
        raise (HTTPException(status_code=500))
