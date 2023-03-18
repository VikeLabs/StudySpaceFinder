import os
import sqlite3 as sql


class DbServices:
    def __enter__(self):
        path = os.path.join("db", ".database.db")
        self.connection = sql.connect(path)
        self.cursor = self.connection.cursor()
        return self

    def __exit__(self, *_):
        self.cursor.close()
        self.connection.close()
