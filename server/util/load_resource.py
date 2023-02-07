import json


def load_resource(path: str):
    f = open(path)
    data = json.load(f)
    f.close()
    return data
