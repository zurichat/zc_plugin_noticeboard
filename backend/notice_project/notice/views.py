from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import views
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .serializers import NoticeSerializer, CommentReactionSerializer


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


class CreateNoticeView(views.APIView):

    def post(self, request):
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentReactionAPIView(views.APIView):

    def put(self, request):
        serializer = CommentReactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "data": serializer.data,
                "message": "Your have successfully updated your reaction"
            })
        return Response({
                "success": False,
                "data": serializer.data,
                "message": "Your hreaction could not be updated"
            })


    def patch(self, request):
        serializer = CommentReactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "data": serializer.data,
                "message": "Your have successfully updated your reaction"
            })
        return Response({
                "success": False,
                "data": serializer.data,
                "message": "Your reaction could not be updated"
            })
