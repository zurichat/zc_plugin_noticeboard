import json
from urllib.parse import urlencode

import requests


class Dbnoticeboard:

    """Class based DB to Read and write to zc_core using the read and write endpoints"""

    def __init__(self):
        BASE_URL = "https://api.zuri.chat"
        self.read_endpoint = (
            BASE_URL + "/data/read/613fc3ea6173056af01b4b3e/{collec_name}/{org_id}"
        )
        self.write_api = "https://api.zuri.chat/data/write"

    def scheduleRead(self, collection_name, org_id, filter={}):

        """Gets json data from the Db"""

        url = self.read_endpoint.format(
            collec_name=collection_name,
            org_id=org_id,
        )

        try:
            res = requests.get(url=url).json()
            print("Working.................!")
            print(res)
            return res

        except Exception as e:
            print("OOps: There is a problem with the Request", e)

    def scheduleSave(self, collection_name, notice_data):
        """This method stores noticeboard related data as json to the Db.
        It does this using the collection name and the serialized json
        """
        di = {
            "plugin_id": "613fc3ea6173056af01b4b3e",
            "organization_id": " ",
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": notice_data,
        }

        data = json.dumps(di).encode("utf-8")
        print(data)
        try:
            r = requests.post(self.write_api, data)
            print(r.text)
            r.raise_for_status()
        except requests.exceptions.RequestException as err:
            print("OOps: There is a problem with the Request", err)
        except requests.exceptions.HTTPError as errh:
            print("Http Error:", errh)
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)


schDb = Dbnoticeboard()
# Db.read("tf")
tolu = dict(store="mama_put", owner="Aunty justina")
tolu.update(iphone=5)

# e=Db.save("not6", notice_data=tolu)
e = schDb.scheduleRead("not6", " ")

# print(Db.read_api)
