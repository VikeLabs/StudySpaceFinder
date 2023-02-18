import sqlite3 as sql
from typing import Any, List


class DbServices:
    def __init__(self):
        self.connection = sql.connect(".database.db")
        self.cursor = self.connection.cursor()
