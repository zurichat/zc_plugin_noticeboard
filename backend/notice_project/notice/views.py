from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .serializers import NoticeSerializer


# Create your views here.
class NoticeView(APIView):
    """GET request to display/retrieve all existing notices"""
    def get(self, request):
        data= [
        {"id": 1,
        "title": "Notice Test 1",
        "text": "Clear at least one issue before the end of the week to be promoted",
        "photo_url": "null",
        "video_url": "null",
        "audio_url": "null",
        "published": "True"},

        {"id": 2,
        "title": "Notice Test 2",
        "text": "Plugin must work without it's own database",
        "photo_url": "null",
        "video_url": "null",
        "audio_url": "null",
        "published": "True"},

        {"id": 3,
        "title": "Notice Test 3",
        "text": "CI/CD must be implemented by DevOps",
        "photo_url": "null",
        "video_url": "null",
        "audio_url": "null",
        "published": "True"},

        {"id": 4,
        "title": "Notice Test 4",
        "text": "Evryone should work individually",
        "photo_url": "null",
        "video_url": "null",
        "audio_url": "null",
        "published": "True"}
        ]
        results = NoticeSerializer(data, many=True).data
        return Response(results, status=status.HTTP_200_OK)


class CreateNoticeView(APIView):

    def post(self, request):
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
 










    
# def home(request):
#     pass

# def endpoints(request):
#     data = {
#         "viewNotice": "http://localhost:8000/api/viewNotice/",
#         "sendNotice": "http://localhost:8000/api/sendNotice/",
#         "editTimsestamp": "http://localhost:8000/api/setNoticeTimestamp/",
#         "endpoints": "http://localhost:8000/api/endpoints/",
#     }

#     return JsonResponse(data, status=200)

# def viewNotice(request):
#     data = {
#         "id": 1,
#         "username": "Bruce Wayne",
#         "date":"24 Hours ago",
#         "timestamp": "3 Hours ago",
#         "views": "21",
#         "likes": "12",
#         "title": "App Testing Event",
#         "info": ""
#     }

#     return JsonResponse(data, status=200)


# def sendNotice(request):
#     data = {
#         "username": "Daniel",
#         "recipient": "ZetsuArmy",
#         "title": "Does It Work?",
#         "fileUploaded": "",
#         "message": "Yes, It Works!!!"
#     }

#     return JsonResponse(data, status=200)

# def setNoticeTimestamp(request):
#     data = {
#         "timestamp": "3 Hours ago"
#     }
    
#     return JsonResponse(data, status=200)