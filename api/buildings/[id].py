from functions.lib.http import HTTP
from functions.routers.buildings import services


class handler(HTTP):
    def do_GET(self):
        (param, query) = self.get_queries()
        try:
            hour = int(query["hour"][0])
            minute = int(query["minute"][0])
            day = int(query["day"][0])
            bldg_id = int(param)

            payload = services.get_building_schedules(bldg_id, hour, minute, day)
            if payload is None:
                self.status(404).error("Building not found.")
                return

            self.status(200).json(payload.dict())

        except KeyError as e:
            self.status(400).error("Missing required queries")
            print(e)

        except TypeError as e:
            self.status(400).error("Invalid queries types")
            print(e)
