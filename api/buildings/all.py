from functions.lib.http import HTTP
from functions.routers.buildings import services


class handler(HTTP):
    def do_GET(self):
        buildings = services.get_all_buildings()
        if buildings is None:
            self.status(500).error("Building data not found")
            return

        self.status(200).json([building.dict() for building in buildings])
