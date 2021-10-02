from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import NoticeReminder,mytest

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(mytest, "interval", seconds=10)
    scheduler.start()