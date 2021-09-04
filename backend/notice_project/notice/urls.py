from django.urls import path
from .views import CommentCreateView, CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, CommentCreateView

# add url routes here

urlpatterns = [

    path('notices/', CreateNoticeView.as_view()),

    path('all-notices', AllNoticesView.as_view()),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('comment/delete', CommentDeleteAPIView.as_view()),

    path('notice/delete', NoticeDeleteAPIView.as_view()),

    path('comment/create', CommentCreateView.as_view()),

]
