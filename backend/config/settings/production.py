from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG value has been hidden using decouple in the .env file
DEBUG = config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['zuri-chat-ip-address','www.zurichat-url']

# Database
# to be configured to use zuri chat database during production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
