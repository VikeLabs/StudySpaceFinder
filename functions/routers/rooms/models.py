from db.database import Database


class RoomModel(Database):
    def __init__(self, room_id: int):
        self.room_id = room_id

    def get_room_info(self):
        q = """
            SELECT
                rooms.room,
                buildings.name
            FROM rooms 
            JOIN buildings
                ON building_id=buildings.id
            WHERE rooms.id = ?
        """
        return self.cursor.execute(q, (self.room_id,)).fetchone()

    def get_room_sessions(self):
        q = """
            SELECT
                subjects.subject,
                sec.section,
                sec.time_start_str,
                sec.time_end_str,
                sec.sunday,
                sec.monday,
                sec.tuesday,
                sec.wednesday,
                sec.thursday,
                sec.friday,
                sec.saturday
            FROM sections as sec
            JOIN
                subjects
                    ON sec.subject_id = subjects.id
            WHERE
                sec.room_id = ?;
        """
        return self.cursor.execute(q, (self.room_id,)).fetchall()
