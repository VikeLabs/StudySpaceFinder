import requests
from urllib import parse


BANNER = "https://banner.uvic.ca/StudentRegistrationSsb/ssb/"
MAX: int = 500


def fetch_sections(term: str, offset: int):
    if offset == 0:
        raise ValueError(f"offset has to be greater than 0, got {offset}")

    # set term
    url = f"{BANNER}/term/search?mode=search"
    payload = {"term": term}
    s = requests.Session()
    s.post(url, data=payload)

    # fetch a session
    url = parse.urljoin(BANNER, "searchResults/searchResults")
    q = {"txt_term": "202301", "pageOffset": f"{offset * MAX}", "pageMaxSize": "500"}

    url += f"?{parse.urlencode(q)}"

    res = s.get(url)

    return res.json()
