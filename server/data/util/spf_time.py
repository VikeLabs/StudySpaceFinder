from typing import List


def time_to_second(time: str) -> int:
    """Convert the time string to seconds
    ie: time_to_second("0800") == 28800

    Param:
        time (str): BANNER string representation of time - "0800"
    Returns:
        second (int): seconds ellapsed from 0:00am
    """

    hour = int(time[:2])
    min = int(time[2:])

    return hour * 3600 + min * 60


def get_time_index(time: str) -> int:
    """Return the time index based on the given time string

    Params:
        time (str): ie "0800"

    Returns:
        idx (int): index of param _time_
    """
    zero_index_value = 8 * 3600
    current_time = time_to_second(time)

    time_diff = current_time - zero_index_value

    return time_diff // (30 * 60)


def generate_time_intervals() -> List[bool]:
    """Returns an array of default value (False)

    Returns:
        arr (List[bool])
    """
    current_value = time_to_second("0800")
    last_value = time_to_second("2300")

    out: List[bool] = list()

    while current_value <= last_value:
        out.append(True)
        current_value += time_to_second("0030")

    return out


def occupied_range(time_start: str, time_end: str) -> List[int]:
    """Returns a list of indexes where the time is in range of params

    Params:
        time_start (str): ie "0800"
        time_end (str): ie "0850"

    Returns:
        idx (List[int]): ie `[0, 1]`
    """
    start_idx = get_time_index(time_start)
    end_idx = get_time_index(time_end)

    return [i for i in range(start_idx, end_idx + 1)]


# tests
if __name__ == "__main__":
    print("Testing time_to_second()")
    print(time_to_second("0800") == 28800)

    print("Testing get_time_index()")
    print(get_time_index("0929") == 2)

    print("Testing generate_time_intervals()")
    print(generate_time_intervals())

    print("Testing occupied_range()")
    print(occupied_range("0800", "0850") == [0, 1])
