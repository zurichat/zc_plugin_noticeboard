from django.urls import path
from .views import (
    sendNotice, 
    viewNotice, 
    setNoticeTimestamp, 
    endpoints,
    UserListView,
    GroupListView
)

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path("setNoticeTimestamp/", setNoticeTimestamp, name="set-notice"),
    
    path("endpoints/", endpoints, name="endpoints"),

    #end point for the serializer api which will return the users
    path('user/', UserListView.as_view()),
    path('group/', GroupListView.as_view()),
    
]