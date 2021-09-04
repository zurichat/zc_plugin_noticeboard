from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView,EditNoticeAPIView, AllNoticesView, deleteNotice, CommentDeleteAPIView, AllUserNoticesView

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('notice/update', EditNoticeAPIView.as_view()),
    
    path('delete-notice', deleteNotice, name='delete-notice'),

    path('comment/delete', CommentDeleteAPIView.as_view()),

    path('notices/usernotice/all/', AllUserNoticesView.as_view()),
]
