import json

import requests
from django.conf import settings
from notice.views import NoticeReminder

# Initialize NoticeReminder class
notice_reminder = NoticeReminder()


def mytest():
    read_schedules = (
        "http://127.0.0.1:8000/api/v1/organisation/614679ee1a5607b13c00bcb7/schedules"
    )

    response = requests.request("GET", read_schedules)
    print(response.text)
