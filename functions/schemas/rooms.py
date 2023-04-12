from typing import Optional, List
from pydantic import BaseModel


class Session(BaseModel):
    time_start_str: str
    room_id: int
    room: str
    subject: str
    time_start_int: int
    time_end_int: int


class SessionDetail(BaseModel):
    time_start: str
    time_end: str
    subject: str
    section: str


class RoomSummary(BaseModel):
    room_id: int
    room: str
    next_class: Optional[str]
    subject: Optional[str]


class RoomSchedule(BaseModel):
    Monday: List[SessionDetail]
    Tuesday: List[SessionDetail]
    Wednesday: List[SessionDetail]
    Thursday: List[SessionDetail]
    Friday: List[SessionDetail]
    Saturday: List[SessionDetail]
    Sunday: List[SessionDetail]


class RoomDetail(BaseModel):
    building: str
    room: str
    schedules: RoomSchedule
