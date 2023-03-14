import sqlite3 as sql


class DbServices:
    def __enter__(self):
        self.connection = sql.connect(".database.db")
        self.cursor = self.connection.cursor()
        return self

    def __exit__(self, *_):
        self.cursor.close()
        self.connection.close()
