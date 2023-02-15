import requests
from urllib import parse
from typing import Any, Dict

BANNER = "https://banner.uvic.ca/StudentRegistrationSsb/ssb/"


def search_result_url(offset: int) -> str:
    base = parse.urljoin(BANNER, "searchResults/searchResults")
    q = {"txt_term": "202301", "pageOffset": f"{offset * 500}", "pageMaxSize": "500"}

    return f"{base}?{parse.urlencode(q)}"
