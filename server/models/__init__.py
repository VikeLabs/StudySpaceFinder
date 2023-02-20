from pydantic import BaseModel
from typing import List, Dict


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


class SectionDetail(BaseModel):
    time_start: str
    time_end: str
    subject: str


class RoomDetail(BaseModel):
    id: int
    room: str
    schedules: Dict[str, List[SectionDetail]]  # { "monday": [...some data] }
