from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import NoticeReaction
from .serializers import ReactionSerializer
# Create your views here.

def home(request):
    pass

def endpoints(request):
    data = {
        "viewNotice": "http://localhost:8000/api/viewNotice/",
        "sendNotice": "http://localhost:8000/api/sendNotice/",
        "editTimsestamp": "http://localhost:8000/api/setNoticeTimestamp/",
        "endpoints": "http://localhost:8000/api/endpoints/",

        #for the users and groups
        #now a user can now add other users to a group
        #and u can also add other groups or users.
        #postman should be used or it should be view in api format
        "delete reaction": "http://localhost:8000/api/destroy-notice/(put in the id of the reaction to delete here)/",
        "eg":"http://localhost:8000/api/destroy-notice/5/"
    }

    return JsonResponse(data, status=200)

def viewNotice(request):
    data = {
        "id": 1,
        "username": "Bruce Wayne",
        "date":"24 Hours ago",
        "timestamp": "3 Hours ago",
        "views": "21",
        "likes": "12",
        "title": "App Testing Event",
        "info": ""
    }

    return JsonResponse(data, status=200)


def sendNotice(request):
    data = {
        "username": "Daniel",
        "recipient": "ZetsuArmy",
        "title": "Does It Work?",
        "fileUploaded": "",
        "message": "Yes, It Works!!!"
    }

    return JsonResponse(data, status=200)

def setNoticeTimestamp(request):
    data = {
        "timestamp": "3 Hours ago"
    }
    
    return JsonResponse(data, status=200)


#serializers class based views
class DestroyNoticeReaction(generics.RetrieveDestroyAPIView):
    queryset = NoticeReaction.objects.all()
    serializer_class =  ReactionSerializer
