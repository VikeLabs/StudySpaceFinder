def validate_time(hour: int, minute: int, day: int) -> bool:
    valid_hour = 0 <= hour <= 24
    valid_minute = 0 <= minute <= 60
    valid_day = 0 <= day <= 6
    if not valid_hour or not valid_minute or not valid_day:
        return False

    if hour == 24 and minute > 0:
        return False

    return True
