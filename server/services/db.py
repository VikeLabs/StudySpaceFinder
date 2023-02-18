import sqlite3 as sql


class DbServices:
    def __init__(self):
        self.connection = sql.connect(".database.db")
        self.cursor = self.connection.cursor()
