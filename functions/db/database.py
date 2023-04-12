import os
import sqlite3 as sql


class Database:
    def __enter__(self):
        self.connection = sql.connect(os.path.join("functions", "db", ".database.db"))
        self.cursor = self.connection.cursor()
        return self

    def __exit__(self, *_):
        self.cursor.close()
        self.connection.close()
