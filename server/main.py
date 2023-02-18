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


@app.get("/api/building/all", status_code=200)
def serve_all_building_names():
    return building_services.get_all()


# ie: /Cornett%20Building/A120 - don't forget to encode whitespace for the url
@app.get("/api/building/{bldg_id}/{day}", status_code=200)
def serve_all_rooms(bldg_id: str, day: str):
    bldg = parse.unquote(bldg_id)
    return []


# ie: /Cornett%20Building
@app.get("/api/{bldg}", status_code=200)
def get_building_info(bldg: str):
    return []
