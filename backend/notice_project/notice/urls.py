from django.urls import path
from .views import sidebar, install

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),
]