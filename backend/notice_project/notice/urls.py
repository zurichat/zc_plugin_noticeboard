from django.urls import path
from .views import (
    sendNotice, 
    viewNotice, 
    setNoticeTimestamp, 
    endpoints, 
    ReactionList,
    ReactionDetail
)

#add url routes here

urlpatterns = [

    path("sendNotice/", sendNotice, name="send-notice"),

    path("viewNotice/", viewNotice, name="view-notice"),

    path("setNoticeTimestamp/", setNoticeTimestamp, name="set-notice"),
    
    path("endpoints/", endpoints, name="endpoints"),

    path('reaction/', ReactionList.as_view()),
    path('reaction/<int:pk>/', ReactionDetail.as_view()),
    
]