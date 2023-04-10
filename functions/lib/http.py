from http.server import BaseHTTPRequestHandler
import json
from typing import Any, Dict
from urllib import parse


class HTTP(BaseHTTPRequestHandler):
    def __init__(self, *arg, **kwarg) -> None:
        super().__init__(*arg, **kwarg)

    def status(self, code: int) -> "HTTP":
        self.send_response(code)
        return self

    def json(self, payload):
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())
        return self

    def error(self, mesg: str):
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"detail": mesg}).encode())
        return self

    def done(self):
        self.end_headers()

    def get_queries(self):
        """
        at /api/buildings/14?hour=19&minute=59&day=2, this returns
        `( 14, {'hour': ['19'], 'minute': ['59'], 'day': ['2'], 'id': ['14']} )`
        """
        url = parse.urlsplit(self.path)
        path_param = url.path.split("/")[-1]
        return (path_param, parse.parse_qs(url.query))
