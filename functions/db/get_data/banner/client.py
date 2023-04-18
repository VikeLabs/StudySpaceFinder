from typing import List
import requests
from urllib import parse

from .schemas import BannerSection, Term


class BannerClient(requests.Session):
    def __init__(self):
        super().__init__()
        self.banner_base = "https://banner.uvic.ca/StudentRegistrationSsb/ssb/"
        self.banner_set_term = parse.urljoin(
            self.banner_base, "term/search?mode=search"
        )
        self.banner_get_term = parse.urljoin(
            self.banner_base, "classSearch/getTerms?offset=1&max=1"
        )
        self.banner_search_result = parse.urljoin(
            self.banner_base, "searchResults/searchResults"
        )
        self.term = ""  # NOTE: set by self.get_latest_term

        self._MAX_SIZE = 500  # NOTE: max from banner is 500

    def get_latest_term(self) -> Term:
        response = self.get(self.banner_get_term)
        assert response.status_code == 200

        term = response.json()[0]  # first entry = latest term
        description = term["description"]
        code = term["code"]
        self.term = code

        return Term(code, description)

    def set_term(self):
        assert self.term != ""
        res = self.post(self.banner_set_term, data={"term": self.term})
        assert res.status_code == 200

    def get_data(self, offset: int) -> List[BannerSection] | None:
        q = {
            "txt_term": self.term,
            "pageOffset": offset * self._MAX_SIZE,
            "pageMaxSize": self._MAX_SIZE,
        }
        resp = self.get(f"{self.banner_search_result}?{parse.urlencode(q)}")
        assert resp.status_code == 200

        payload = resp.json()

        data = payload["data"]
        if len(data) == 0:
            print("\t\t\t[ok] fetched data from Banner")
            return None

        fetched = offset * self._MAX_SIZE + len(data)
        print(f"\t\t\t[pending] fetched {fetched}/{payload['sectionsFetchedCount']}")
        return [BannerSection.new(x) for x in data]
