from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('comment/delete', CommentDeleteAPIView.as_view()),
    
    path('notice/delete', NoticeDeleteAPIView.as_view()),
    
]

