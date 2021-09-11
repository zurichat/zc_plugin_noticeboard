import requests, json


class Dbnoticeboard:

    """Class based DB to Read and write to zc_core using the read and write endpoints"""

    def __init__(self):
        BASE_URL = "https://api.zuri.chat"
        self.read_endpoint = (
            BASE_URL + "/data/read/{pgn_id}/{collec_name}/{org_id}?{query}"
        )
        self.write_endpoint = BASE_URL + "/data/write"

    def read(self):
        """Gets json data from the Db"""
        print("Read api works")
        pass

    def save(self, collection_name,notice_data):
        """This method stores noticeboard related data as json to the Db.
        It does this using the collection name and the serialized json
        """
        di = {
            "plugin_id": "6139276099bd9e223a37d91d",
            "organization_id": "613a1a3b59842c7444fb0220",
            "collection_name": collection_name,
            "bulk_write": False,
            "object_id": "55",
            "filter": {},
            "payload": notice_data,
        }
        
        data=json.dumps(di).encode("utf-8")
        print(data)
        try:
            r = requests.post(self.write_endpoint,data)
            print(r.text)
            r.raise_for_status()
        except requests.exceptions.RequestException as err:
            print("OOps: There is a problem with the Request", err)
        except requests.exceptions.HTTPError as errh:
            print("Http Error:", errh)
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)


        pass


Database = Dbnoticeboard()
# Database.read()
# notice_data = dict(name=5,song_artist="Celestine Ukwu")
# di = {
#     "plugin_id": "6139276099bd9e223a37d91d",
#     "organization_id": "613a1a3b59842c7444fb0220",
#     "collection_name": collection_name,
#     "bulk_write": False,
#     "object_id": "55",
#     "filter": {},
#     "payload": tolu,
# }


# Database.save("tf",notice_data)
# print(Database.save)
