from .base import *
# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','localhost']


#installed app for development
INSTALLED_APPS +=[
    
]


#installed middleware for development
MIDDLEWARE += [

]

#sqlite database for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

