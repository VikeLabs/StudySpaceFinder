import requests
from urllib import parse
from typing import Any, Dict


def fetch_sections(term: str, offset: int) -> Dict[str, Any]:
    """Fetches and returns 500 entries, based on the offset param

    Params:
        term (str): ie, Winter 2023 -> term="202301"
        offset (int): Banner server "paginates" their responses, think of this like page number

    Returns:
        Dictionary version of a monstrosity of JSON to be parsed.
    """

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
