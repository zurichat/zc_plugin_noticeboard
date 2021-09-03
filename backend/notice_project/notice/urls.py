from django.urls import path
from .views import CreateNoticeView, CommentReactionAPIView

#add url routes here

urlpatterns = [

    path('notices/', CreateNoticeView.as_view()),

    path('comment/reaction/update', CommentReactionAPIView.as_view()),
    
]
