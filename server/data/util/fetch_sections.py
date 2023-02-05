import requests
from urllib import parse


def fetch_sections(term: str, offset: int):
    banner = "https://banner.uvic.ca/StudentRegistrationSsb/ssb/"
    max: int = 500

    if offset == 0:
        raise ValueError(f"offset has to be greater than 0, got {offset}")

    # set term
    url = f"{banner}/term/search?mode=search"
    payload = {"term": term}
    s = requests.Session()
    s.post(url, data=payload)

    # fetch a session
    url = parse.urljoin(banner, "searchResults/searchResults")
    q = {"txt_term": "202301", "pageOffset": f"{offset * max}", "pageMaxSize": "500"}

    url += f"?{parse.urlencode(q)}"

    res = s.get(url)

    return res.json()
