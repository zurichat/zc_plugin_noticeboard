from django.urls import path
<<<<<<< HEAD
from .views import CommentCreateView, CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, CommentCreateView
=======
from .views import CreateNoticeView, CommentReactionAPIView, AllNoticesView, CommentDeleteAPIView, NoticeDeleteAPIView, \
    EditNoticeAPIView, RetrieveNoticeCommentsView, CommentCreateAPIView,NoticeDetailAPIView
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8

# add url routes here

urlpatterns = [

    path('notices/', CreateNoticeView.as_view()),

    path('all-notices', AllNoticesView.as_view()),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('notice/update', EditNoticeAPIView.as_view()),

    path('comment/delete', CommentDeleteAPIView.as_view()),

    path('notice/delete', NoticeDeleteAPIView.as_view()),

<<<<<<< HEAD
    path('comment/create', CommentCreateView.as_view()),

]
=======
    path('comment/get', RetrieveNoticeCommentsView.as_view()),

    path('comment/create', CommentCreateAPIView.as_view()),

    path('notice/<int:notice_id>/details', NoticeDetailAPIView.as_view()),

]
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8
