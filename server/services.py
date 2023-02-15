from typing import List, Dict
from fastapi import HTTPException
from data.main import data


def find_by_building_id(bldg_id: str):
    if not data.get(bldg_id):
        raise HTTPException(404, detail=f"Building ID: {bldg_id} not found.")

    return data[bldg_id]


def get_all_buildings() -> List[Dict[str, str]]:
    out: List[Dict[str, str]] = list()

    for bldg in data.keys():
        name: str = data[bldg]["building_description"]
        out.append({"name": name, "id": bldg})

    return out
