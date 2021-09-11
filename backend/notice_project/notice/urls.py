from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, \
    EditNoticeAPIView, RetrieveNoticeCommentsView, CommentCreateAPIView,NoticeDetailAPIView,install,store_notice

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),
    path('save',store_notice, name='store_notice'),

]