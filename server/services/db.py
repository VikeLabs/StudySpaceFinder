import sqlite3 as sql
from typing import Any, Dict, List


class DbServices:
    def __init__(self):
        self.connection = sql.connect(".database.db")
        self.cursor = self.connection.cursor()

    def __del__(self):
        self.connection.close()

    def query_one(self, table: str, select: List[str], query: Dict[str, Any]):
        q = [f"{k}={v}" for k, v in query.items()]

        sql = f"""
        SELECT ({','.join(select)}) FROM {table} 
            WHERE {' AND '.join(q)} LIMIT 1;
        """
        return self.cursor.execute(sql).fetchone()
