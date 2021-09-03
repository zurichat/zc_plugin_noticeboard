from django.urls import path
from .views import (
    sendNotice, 
    viewNotice, 
    setNoticeTimestamp, 
    endpoints,
    DestroyNoticeReaction
)

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path("setNoticeTimestamp/", setNoticeTimestamp, name="set-notice"),
    
    path("endpoints/", endpoints, name="endpoints"),

    #end point for the serializer api which will show the reaction to be deleted
    path('destroy-notice/<int:pk>/', DestroyNoticeReaction.as_view()),
    
    
]