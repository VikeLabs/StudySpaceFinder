from functions.db.database import Database


class BuildingModels(Database):
    def __init__(self):
        pass

    def get_all_buildings(self):
        q = "SELECT id,name FROM buildings ORDER BY name ASC;"
        return self.cursor.execute(q).fetchall()

    def get_building_name(self, bldg_id: int):
        q = "SELECT name from buildings WHERE id=?"
        return self.cursor.execute(q, (bldg_id,)).fetchone()

    def get_building_rooms(self, bldg_id: int):
        q = """
            SELECT 
                rooms.id,
                rooms.room 
            FROM rooms 
                JOIN buildings 
                    ON rooms.building_id=buildings.id 
            WHERE buildings.id=?
            ORDER BY rooms.room ASC;
        """
        return self.cursor.execute(q, (bldg_id,)).fetchall()

    def get_room_schedule(self, room_id: int, day: str):
        q = f"""
            SELECT
                sections.time_start_str,
                rooms.id,
                rooms.room,
                subjects.subject,
                sections.time_start_int,
                sections.time_end_int
            FROM sections 
                JOIN rooms 
                    ON sections.room_id=rooms.id
                JOIN subjects
                    ON sections.subject_id=subjects.id
            WHERE sections.room_id=? 
                AND {day}=true
            ORDER BY time_start_int ASC
        """
        return self.cursor.execute(q, (room_id,)).fetchall()
