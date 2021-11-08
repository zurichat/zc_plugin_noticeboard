from .base import *
from django.core.management.commands.runserver import Command as runserver

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "178.63.43.138", "staging.zuri.chat"]

# zurch chat database to be configure here
DATABASES = {}
runserver.default_port = "22670"