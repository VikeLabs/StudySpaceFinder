from typing import List
from pydantic import BaseModel
from .rooms import RoomSummary


class Building(BaseModel):
    id: int
    name: str


class BuildingSummary(BaseModel):
    building: str
    data: List[RoomSummary]
