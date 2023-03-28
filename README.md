# Study Space Finder

Server for [Study Space Finder](https://github.com/Scott-Kenning/StudySpaceFinder).

## TOC

- [API](#api)
- [Development](#development)

### API

> All GETs, no POST.

#### `/api/building/all`

Returns an array of building objects:

```json
[
  { "id": 1, "name": "Bob Wright Centre" },
  { "id": 2, "name": "Business and Economics Building" }
]
```

#### `/api/building/{building_id}`

- Queries:
  - `hour`: between 0 and 24, inclusive
  - `minute`: between 0 and 60, inclusive
  - `day`: between 0 and 6, inclusive, where 0 is Sunday, 1 is Monday, etc...

Returns a json object for building related data at that time of the day specified

example: `/api/building/22?hour=10&minute=10&day=5`

```json
{
  "building": "Hickman Building",
  "data": [
    {
      "room_id": 180,
      "room": "105",
      "next_class": "10:30 am",
      "subject": "POLI103"
    },
    {
      "room_id": 129,
      "room": "128",
      "next_class": null,
      "subject": null
    }
  ]
}
```

- `next_class` is `null` if the class is free until end of day

#### `/api/room/{room_id}`

Returns a json containing the full schedule of the requested room.

```json
{
  "building": "David Turpin Building",
  "room": "B311",
  "schedules": {
    "Monday": [
      {
        "time_start": "10:00 am",
        "time_end": "11:50 am",
        "subject": "GEOG101B",
        "section": "B01"
      }
    ],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  }
}
```

### Development

#### Requirements

- Python 3.10
- SQLite
- Docker

#### With Docker

Assuming you have [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/install/)
installed (usually docker compose will come with docker).

At the root of the project:

```sh
cd server && docker-compose up
# include flag `--build` if running the first time.
```

If it hasn't been built before, in the server folder run:

```sh
docker-compose up --build
```

`CTRL-C` will only stop the container, in the future, to prune the `spf` docker image:

```sh
docker-compose down
```

#### With Python

**NOTE**: Create a [virtual environment](https://python.land/virtual-environments/virtualenv).

Go into the `server` directory:

```sh
python3 -m venv venv # creating a venv

## windows ##
# In cmd.exe
venv\Scripts\activate.bat
# In PowerShell
venv\Scripts\Activate.ps1

## unix ##
source venv/bin/activate
```

Install the dependencies:

```sh
pip install -r requirements.txt
```

Start server:

```sh
uvicorn main:app --host 0.0.0.0 --reload
```

#### Update `requirements.txt`

- **virtual environments IS activated**

```sh
pip freeze > requirements.txt
```

#### Get data from UVic

Assuming the virtual env is activated, to fetch a term data from UVic, for example spring 2023, run

```sh
cd server && python script.py get-data 202301
```
