from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView, NoticeView

#add url routes here

urlpatterns = [
    path('all-notices', NoticeView.as_view()),
    path('notices/', CreateNoticeView.as_view()),
    path('comment/reaction/update', CommentReactionAPIView.as_view()), 
]
