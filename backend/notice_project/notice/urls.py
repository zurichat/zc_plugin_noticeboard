from django.urls import path
from .views import sendNotice, viewNotice, setNoticeTimestamp, endpoints
from .views import CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, CommentReactionDeleteAPIView

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path('notices/', CreateNoticeView.as_view()),

    path('all-notices/', AllNoticesView.as_view()),

    path("setNoticeTimestamp/", setNoticeTimestamp, name="set-notice"),
    
    path("endpoints/", endpoints, name="endpoints"),
    
    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('comment/delete', CommentDeleteAPIView.as_view()),
    
    path('notice/delete', NoticeDeleteAPIView.as_view()),

    path('comment/reaction/<int:pk>/delete', CommentReactionDeleteAPIView.as_view()),
]

