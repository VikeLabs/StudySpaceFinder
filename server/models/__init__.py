from pydantic import BaseModel
from typing import List, Optional


class Building(BaseModel):
    id: int
    name: str


class RoomSummary(BaseModel):
    room_id: int
    room: str
    next_class: Optional[str]
    subject: Optional[str]


class BuildingSummary(BaseModel):
    building: str
    data: List[RoomSummary]


class SectionDetail(BaseModel):
    time_start: str
    time_end: str
    subject: str
    section: str


class RoomSchedule(BaseModel):
    Monday: List[SectionDetail]
    Tuesday: List[SectionDetail]
    Wednesday: List[SectionDetail]
    Thursday: List[SectionDetail]
    Friday: List[SectionDetail]
    Saturday: List[SectionDetail]
    Sunday: List[SectionDetail]


class RoomDetail(BaseModel):
    building: str
    room: str
    schedules: RoomSchedule
