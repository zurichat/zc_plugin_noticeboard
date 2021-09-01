from django.urls import path
from .views import sendNotice, viewNotice, setNoticeTimestamp, endpoints,CreateNoticeView

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path("setNoticeTimestamp/", setNoticeTimestamp, name="set-notice"),
    
    path("endpoints/", endpoints, name="endpoints"),

    path('notices/', CreateNoticeView.as_view()),
    path('notices/<int:pk>/', CreateNoticeView.as_view()),
    
]