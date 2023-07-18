def to_int(time: str) -> int:
    hour = time[:2]
    min = time[2:]
    return int(hour) * 3600 + int(min) * 60


def format_time_str(time: str) -> str:
    hour = int(time[:2])
    min = int(time[2:])
    prefix = "am"

    noon = 12 * 60 * 60
    current_time = hour * 3600 + min * 60

    if current_time >= noon:  # 12:00 pm
        prefix = "pm"
    if current_time >= noon + 3600:  # 13:00 pm -> 1:00 pm
        hour -= 12

    return f"{hour}:{min:02} {prefix}"
