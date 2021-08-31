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
        "username": "Daniel",
        "title": "Displaying A Static JSON Data",
        "timestamp": "21-08-31 00:00:00",
        "noOfLikes": 2,
        "noOfViews": 156,
        "imgUrl": ""
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
        "timestamp": "21-09-01 11:30:00"
    }
    
    return JsonResponse(data, status=200)