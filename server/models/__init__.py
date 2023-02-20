from pydantic import BaseModel
from typing import List


class Building(BaseModel):
    id: int
    name: str


class RoomSummary(BaseModel):
    id: int
    room: str
    next_class: str
    subject: str


class BuildingSummary(BaseModel):
    building: str
    data: List[RoomSummary]
