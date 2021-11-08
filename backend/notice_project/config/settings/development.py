from .base import *
from django.core.management.commands.runserver import Command as runserver

# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = True

ALLOWED_HOSTS = [
    "178.63.43.138",
    "127.0.0.1",
    "localhost",
    "noticeboard.zuri.chat",
    "staging.zuri.chat",
    "*",
]

runserver.default_port = "22670"

# installed app for development
INSTALLED_APPS += []


# installed middleware for development
MIDDLEWARE += []

# sqlite database for development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}
