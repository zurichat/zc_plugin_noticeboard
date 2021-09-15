from django.urls import path
from .views import install,sidebar,create_room, search

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),

    path('create-notice-room', create_room),

    path('search', search.as_view())
]
