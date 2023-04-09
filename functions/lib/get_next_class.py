from typing import List, Optional

from schemas import RoomSummary, Session


def _is_in_range(session: Session, current_time: int) -> bool:
    return session.time_start_int <= current_time <= session.time_end_int


def _build_room_info(session: Session, free_til_eod=False) -> RoomSummary:
    next_class = session.time_start_str
    subject = session.subject

    if free_til_eod:
        next_class = None
        subject = None

    return RoomSummary(
        room_id=session.room_id,
        room=session.room,
        next_class=next_class,
        subject=subject,
    )


def get_next_class(data: List[Session], current_time: int) -> Optional[RoomSummary]:
    if len(data) == 1:
        session = data[0]
        if _is_in_range(session, current_time):
            return None

        if current_time > session.time_start_int:
            return None

        return _build_room_info(
            session, free_til_eod=session.time_end_int < current_time
        )

    # search index
    left_idx = 0
    right_idx = len(data) - 1

    while left_idx < right_idx - 1:
        mid = (right_idx + left_idx) // 2
        current_session = data[mid]

        if _is_in_range(current_session, current_time):
            return None

        if current_time < current_session.time_end_int:
            right_idx = mid
        else:
            left_idx = mid

    right_session = data[right_idx]
    left_session = data[left_idx]

    if current_time > right_session.time_end_int:
        return _build_room_info(right_session, free_til_eod=True)

    # check sessions at the left and right index
    if left_session.time_start_int < current_time:
        if _is_in_range(right_session, current_time):
            return None
        return _build_room_info(right_session)

    if _is_in_range(left_session, current_time):
        return None
    return _build_room_info(left_session)
