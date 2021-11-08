from datetime import date, datetime

from apscheduler.schedulers.background import BackgroundScheduler
from django.utils import timezone

from .jobs import notice_reminder

# Time Zone
time = timezone.now()
# Get Current Time
current_time = f"{time.hour + 1}:{time.minute}:{time.second}"
# Get Current Date
current_date = f"{time.month}-{time.day}-{time.year}"
scheduled_date_and_time = f"{time.hour + 1}:{time.minute}:{time.second + 30}"


"""
The dummy data should not be deleted.
"""
dynamic_data = [
    {
        "title": "Notice Reminder",
        "schedule_time": "15:39:00",
        "schedule_date": "10-3-2021",
    }
]


def notice_me():
    notice_remind = notice_reminder.newly_created_notice_reminder

    if notice_remind:
        print(notice_remind)
    else:
        return dynamic_data


print(dynamic_data[0].get("schedule_date"))
# Get Date and Time Dynamically
dynamic_data = (
    notice_reminder.newly_created_notice_reminder
    if any(notice_reminder.newly_created_notice_reminder)
    else dynamic_data
)

dynamic_date_time = (
    f"{dynamic_data[0].get('schedule_date')} {dynamic_data[0].get('schedule_time')}"
)
# print(f"Date Time: {dynamic_date_time}")

dynamic_date = datetime.strptime(dynamic_date_time, "%m-%d-%Y %H:%M:%S")
# print(f"Dynamic Date Time: {dynamic_date}")


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        notice_me,
        "date",
        run_date=f"{dynamic_date}"
        # "interval",
        # seconds = 30
        # # run_date = "2021-10-2 19:54:00"
        # run_date = f"{scheduled_date_and_time}"
    )
    scheduler.start()
