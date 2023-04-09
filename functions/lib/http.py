from http.server import BaseHTTPRequestHandler
import json


class HTTP(BaseHTTPRequestHandler):
    def __init__(self, *arg, **kwarg) -> None:
        super().__init__(*arg, **kwarg)

    def status(self, code: int) -> "HTTP":
        self.send_response(code)
        self.end_headers()
        return self

    def json(self, payload):
        self.wfile.write(json.dumps(payload).encode())
        return self

    def error(self, mesg: str):
        self.wfile.write(json.dumps({"detail": mesg}).encode())
        return self
