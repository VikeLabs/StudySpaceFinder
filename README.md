# Study Space Finder

Server for the [Study Space Finder](https://github.com/Scott-Kenning/StudySpaceFinder).

### API

> All GETs, no POST.

#### `/api/building/all`

Returns an array of building objects:

```json
[
  { "id": 1, "name": "Bob Wright Centre" },
  { "id": 2, "name": "Business and Economics Building" }
  // etc
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
      "next_class": null, // _null_ for when class is free until end of day
      "subject": null
    }
    // etc
  ]
}
```

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
    "Thursday": []
    // etc
  }
}
```
