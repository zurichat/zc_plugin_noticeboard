from django.urls import path
from .views import install,sidebar

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),
]