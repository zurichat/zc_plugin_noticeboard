from django.urls import path
from .views import install, sidebar, CreateNoticeAPIView, NoticeAPI, UpdateNoticeAPIView, DeleteNotice, search

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install', install, name='install'),

    path('create', CreateNoticeAPIView.as_view()),

    path('update', UpdateNoticeAPIView.as_view()),

    path('view', NoticeAPI.as_view()),

    path('delete', DeleteNotice.as_view()),

    path('search', search.as_view())
]
