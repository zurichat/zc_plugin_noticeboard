from django.urls import path
from .views import install,sidebar,create_room, search, CreateNewNotices

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),

    path('create-notice-room', create_room),

    path('create-notice', CreateNewNotices.as_view()),

    path('search', search.as_view())
]
