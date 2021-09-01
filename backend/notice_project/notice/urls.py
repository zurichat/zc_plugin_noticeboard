from django.urls import path
from .views import NoticeView,CreateNoticeView

#add url routes here

urlpatterns = [
    path('notices/', CreateNoticeView.as_view()), 
    path('all-notices', NoticeView.as_view(), name='all-notices'),
]
