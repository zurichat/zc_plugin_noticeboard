from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView,EditNoticeAPIView, AllNoticesView, deleteNotice, CommentDeleteAPIView

#add url routes here

urlpatterns = [

    path('notices/', CreateNoticeView.as_view()),

    path('all-notices', AllNoticesView.as_view()),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),

    path('notice/update', EditNoticeAPIView.as_view()),
    
    path('delete-notice', deleteNotice, name='delete-notice'),

    path('comment/delete', CommentDeleteAPIView.as_view()),
]
