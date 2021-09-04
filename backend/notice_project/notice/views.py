from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def home(request):
    pass

def endpoints(request):
    data = {
        "viewNotice": "http://localhost:8000/api/viewNotice/",
        "sendNotice": "http://localhost:8000/api/sendNotice/",
        "editTimsestamp": "http://localhost:8000/api/setNoticeTimestamp/",
        "endpoints": "http://localhost:8000/api/endpoints/",
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