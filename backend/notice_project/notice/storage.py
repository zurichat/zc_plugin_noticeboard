import json
from urllib.parse import urlencode

import requests
from django.conf import settings

CENTRIFUGO_TOKEN = "58c2400b-831d-411d-8fe8-31b6e337738b"


class Dbnoticeboard:
    """Class based DB to Read and write to zc_core using the read and write
    endpoints."""

    def __init__(self):
        """Used to initialize the class."""
        base_url = "https://api.zuri.chat"
        self.read_endpoint = (
            base_url
            + "/data/read/613fc3ea6173056af01b4b3e/{collec_name}/{org_id}?{query}"
        )
        self.write_endpoint = base_url + "/data/write"
        self.delete_endpoint = base_url + "/data/delete"
        self.centrifugo_url = "https://realtime.zuri.chat/api"
        self.upload_api = base_url + "/upload/file/613fc3ea6173056af01b4b3e"
        self.upload_multiple_api = base_url + "/upload/files/613fc3ea6173056af01b4b3e"
        self.delete_file_api = base_url + "/delete/file/613fc3ea6173056af01b4b3e"

    def post_to_centrifugo(self, channel_name: str, data: dict):

        """This function is used to post data to centrifugo."""

        headers = {
            "Content-type": "application/json",
            "Authorization": f"apikey {CENTRIFUGO_TOKEN}",
        }
        command = {
            "method": "publish",
            "params": {"channel": channel_name, "data": data},
        }
        response = requests.post(
            self.centrifugo_url, headers=headers, json=command
        ).json()
        print("=" * 50)
        print(response)
        print("=" * 50)
        return response

    def read(self, collection_name, org_id, filter={}):
        """Gets json data from the Db."""

        query = urlencode(filter)

        url = self.read_endpoint.format(
            collec_name=collection_name, org_id=org_id, query=query
        )

        try:
            res = requests.get(url=url).json()
            print("Working.................!")
            print(res)
            return res

        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def save(self, collection_name, org_id, notice_data):
        """This method stores noticeboard related data as json to the Db.

        It does this using the collection name and the serialized json
        """
        data = {
            "plugin_id": settings.PLUGIN_ID,
            "organization_id": org_id,
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": notice_data,
        }

        data = json.dumps(data).encode("utf-8")
        print(data)
        try:
            res = requests.post(self.write_endpoint, data)
            print(res.text)
            res.raise_for_status()
            return res.text
        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def update(self, collection_name, org_id, notice_data, object_id):
        """
        This method updates noticeboard related data as json to the Db.

        It does this using the collection name and the serialized json
        """
        data = {
            "plugin_id": settings.PLUGIN_ID,
            "organization_id": org_id,
            "collection_name": collection_name,
            "bulk_write": False,
            "object_id": object_id,
            "payload": notice_data,
        }

        try:
            res = requests.put(self.write_endpoint, json=data)
            response = res.json()
            print(response)
            return response
        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def delete(self, org_id, collection_name, object_id):
        """Used to delete a data from the DB."""
        data = {
            "plugin_id": settings.PLUGIN_ID,
            "organization_id": org_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": object_id,
            "filter": {},
        }

        try:
            res = requests.post(self.delete_endpoint, json.dumps(data))
            response = res.json()
            print(response)
            return response
        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def upload(self, file, token):
        """Used to upload a single file."""
        url = self.upload_multiple_api
        files = {"file": file}
        try:
            response = requests.post(
                url=url, files=files, headers={"Authorization": f"{token}"}
            )
            return response.json()
        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def multiple_upload(self, files, token):
        """Used to upload multiple files at one."""
        url = self.upload_multiple_api
        try:
            response = requests.post(
                url=url, files=files, headers={"Authorization": f"{token}"}
            )
            return response.json()
        except requests.ConnectionError as error:
            print("Oops: There is a problem with the Request", error)
            return error

    def delete_file(self, file_url):
        """Used to delete a single file."""
        url = self.delete_file_api
        body = dict(file_url=file_url)

        try:
            response = requests.post(url=url, json=body)
            return response.json()
        except requests.ConnectionError as error:
            print("OOps: There is a problem with the Request", error)
            return error

    def token(self):
        """This function is used to get a token"""
        url = "https://api.zuri.chat/auth/login"
        payload = {"email": "papajonatus10@zuri.chat", "password": "test123"}
        newload = json.dumps(payload).encode("utf-8")
        headers = {}
        response = requests.request("POST", url, headers=headers, data=newload)
        get_token = json.loads(response.text)
        new_token = get_token["data"]["user"]["token"]
        return new_token


db = Dbnoticeboard()
