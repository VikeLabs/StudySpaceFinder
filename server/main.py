import json

from typing import Union
from fastapi import FastAPI, HTTPException

app = FastAPI()


# ie: /Cornett%20Building/A120 - don't forget to encode whitespace for the url
@app.get("/{bldg}/{room}", status_code=200)
def get_room_info(bldg: str, room: str):
    bldg = bldg.replace("%20", " ")

    file_path = "./data/building_data.json"

    # read json
    uvic_bldg = open(file_path)
    data = json.load(uvic_bldg)
    uvic_bldg.close()

    building = data.get(bldg).get(room)
    if not building:
        print("[{}-{}] not found".format(bldg, room))
        raise HTTPException(status_code=404)

    return building
