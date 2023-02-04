from typing import List


def get_active_day(i) -> List[str]:
    days: List[str] = list()

    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    for weekday in weekdays:
        if i.get(weekday.lower()):
            days.append(weekday)

    return days
