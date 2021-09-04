from django.urls import path

from .views import (
    sendNotice, 
    viewNotice, 
    setNoticeTimestamp, 
    endpoints, 
    ReactionList,
    ReactionDetail
)

from .views import CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, EditNoticeAPIView, RetrieveNoticeCommentsView


#add url routes here

urlpatterns = [

    path('notices/', CreateNoticeView.as_view()),

    path('all-notices', AllNoticesView.as_view()),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),
    

    path("endpoints/", endpoints, name="endpoints"),

    path('reaction/', ReactionList.as_view()),
    path('reaction/<int:pk>/', ReactionDetail.as_view()),

    path('notice/update', EditNoticeAPIView.as_view()),

    path('comment/delete', CommentDeleteAPIView.as_view()),
    
    path('notice/delete', NoticeDeleteAPIView.as_view()),

    path('comment/get', RetrieveNoticeCommentsView.as_view()),

    
]

