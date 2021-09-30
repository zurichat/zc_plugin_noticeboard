from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import NoticeReminder

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(NoticeReminder, "interval", seconds=10)
    scheduler.start()