from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import generics
from django.contrib.auth.models import User, Group
#importing serializers
from .serializers import UserSerializer, GroupSerializer

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
        "user": "http://localhost:8000/api/user/",
        "group": "http://localhost:8000/api/group/",
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
class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupListView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer