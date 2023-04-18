from http.server import BaseHTTPRequestHandler
from urllib import parse


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        url = self.path
        print(url)
        res = parse.urlparse(url)
        q = parse.parse_qs(res.query)
        print(q)
        self.send_response(200)
        self.end_headers()
