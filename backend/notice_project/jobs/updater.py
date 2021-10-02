from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import notice_reminder

def notice_me():
    notice_remind = notice_reminder.newly_created_notice_reminder
    
    if notice_remind:
        print(notice_remind)
    else:
        print("No recent notice reminders!")

"""
The dummy data should not be deleted.
"""
# dynamic_data = [
#     {
#         "title": "Notice Reminder",
#         "schedule_time": "00:50:00",
#         "schedule_date": "10-2-2021"
#     }
# ]

# dynamic_data = [
#     {
#         "title": "Notice Reminder",
#         "schedule_time": NoticeReminderSerializer.data,
#         "schedule_date": NoticeReminderSerializer.data
#     }
# ]

# print(dynamic_data[0].get("schedule_date"))
# Get Date and Time Dynamically
dynamic_data = notice_reminder.newly_created_notice_reminder if any(notice_reminder.newly_created_notice_reminder) else "dynamic_data"

# dynamic_date_time = f"{dynamic_data[0].get('schedule_date')} {dynamic_data[0].get('schedule_time')}"
# print(f"Date Time: {dynamic_date_time}")

# dynamic_date = datetime.strptime(dynamic_date_time, '%m-%d-%Y %H:%M:%S')
# print(f"Dynamic Date Time: {dynamic_date}")

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
    notice_me,
    "interval",
    seconds = 30
    # "date",
    # run_date = "2021-10-2 12:39:00"
    # run_date = f"{dynamic_date}"
    )
    scheduler.start()


