from typing import List


def get_active_day(i) -> List[str]:
    """Returns a list of active days of a schedule entry from Banner API"""
    days: List[str] = list()

    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    for weekday in weekdays:
        if i.get(weekday.lower()):
            days.append(weekday)

    return days
