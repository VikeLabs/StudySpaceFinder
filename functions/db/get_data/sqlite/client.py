from typing import List
from functions.db.database import Database
from functions.db.get_data.banner.schemas import BannerSection
from functions.db.get_data.sqlite.util import format_time_str, to_int


class DB(Database):
    def __init__(self, fetched: List[BannerSection]):
        super().__init__()
        self.data = fetched

    def drop_existing_tables(self):
        table_to_delete = ["buildings", "rooms", "sections", "subjects"]
        for i in table_to_delete:
            self.cursor.execute(f"DELETE FROM {i}")
            self.connection.commit()
            print(f"\t\t\t[pending] dropped data from table {i}")

    def save_subjects(self):
        buf = list()
        for i in self.data:
            subject = i.subject_course
            desc = i.subject_description
            buf.append((subject, desc))

        sql = """
        INSERT INTO subjects(subject, description)
            VALUES(?,?)
            ON CONFLICT DO NOTHING
        """
        self.cursor.executemany(sql, buf)
        self.connection.commit()

    def save_buildings(self):
        buf = set()
        for i in self.data:
            if len(i.meetings_faculty) == 0:
                continue
            for j in i.meetings_faculty:
                meeting_time = j.meeting_time
                bldg_desc = meeting_time.building_description
                if bldg_desc:
                    try:
                        buf.add(bldg_desc)
                    except KeyError:
                        continue

        sql = """
        INSERT INTO buildings(name)
        VALUES(?)
        ON CONFLICT DO NOTHING
        """
        self.cursor.executemany(sql, [(i,) for i in buf])
        self.connection.commit()

    def save_rooms(self):
        buf = set()
        for i in self.data:
            if len(i.meetings_faculty) == 0:
                continue

            for j in i.meetings_faculty:
                meeting_time = j.meeting_time
                room = meeting_time.room
                bldg_desc = meeting_time.building_description
                if not room or not bldg_desc:
                    continue

                q = "SELECT id FROM buildings WHERE name = ?;"
                bldg_id = self.cursor.execute(q, (bldg_desc,)).fetchone()[0]
                try:
                    buf.add((room, bldg_id))
                except KeyError:
                    continue

        sql = """
        INSERT INTO rooms(room, building_id) VALUES(?, ?)
            ON CONFLICT DO NOTHING;
        """
        self.cursor.executemany(sql, [(room, bldg_id) for room, bldg_id in buf])
        self.connection.commit()

    def save_sessions(self):
        buf = list()
        for i in self.data:
            q = "SELECT id FROM subjects WHERE subject = ?;"
            subject_id = self.cursor.execute(q, (i.subject_course,)).fetchone()[0]
            section = i.sequence_number
            for j in i.meetings_faculty:
                meeting_time = j.meeting_time
                bldg = meeting_time.building_description
                time_start_str = meeting_time.begin_time
                time_end_str = meeting_time.end_time
                if not time_end_str or not time_end_str:
                    continue
                time_start_int = to_int(time_start_str)
                time_end_int = to_int(time_end_str)

                bldg_q = """
                SELECT
                    buildings.id,
                    rooms.id
                FROM buildings
                JOIN rooms
                    ON buildings.id=rooms.building_id
                WHERE (rooms.room=? AND buildings.name=?);
                """
                result = self.cursor.execute(
                    bldg_q,
                    (
                        meeting_time.room,
                        bldg,
                    ),
                ).fetchone()

                if result is None:
                    continue

                (bldg_id, room_id) = result

                section_entry = (
                    section,
                    format_time_str(time_start_str),
                    format_time_str(time_end_str),
                    time_start_int,
                    time_end_int,
                    meeting_time.monday,
                    meeting_time.tuesday,
                    meeting_time.wednesday,
                    meeting_time.thursday,
                    meeting_time.friday,
                    meeting_time.saturday,
                    meeting_time.sunday,
                    subject_id,
                    bldg_id,
                    room_id,
                )
                buf.append(section_entry)

        value_insert = [
            "section",
            "time_start_str",
            "time_end_str",
            "time_start_int",
            "time_end_int",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
            "subject_id",
            "building_id",
            "room_id",
        ]
        params = ["?" for _ in value_insert]

        sql = f"""
        INSERT OR REPLACE INTO 
            sections({",".join(value_insert)}) 
            VALUES({",".join(params)});
        """
        self.cursor.executemany(sql, buf)
        self.connection.commit()
