from .base import *

# SECURITY WARNING: don't run with debug turned on in production!

# DEBUG value has been hidden using decouple in the .env file
DEBUG =  config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['localhost','127.0.0.1']

# installed apps used during development
INSTALLED_APPS +=[

]

#installed middleware used during development
MIDDLEWARE += [

]


#database in use during development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}