from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from .serializers import CreateNoticeSerializer, CommentReactionSerializer, EditNoticeSerializer
import requests
from django.http import JsonResponse

class AllNoticesView(views.APIView):

    """GET request to display/retrieve all existing notices"""
    def get(self, request):
        data= [
        {"user":"null",
        "title":"Management meeting",
        "text":"Management has updated the design scedule",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null"},

        {"user":"null",
        "title":"Stage 5",
        "text":"Complete a ticket to move to stage 5",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null",
        "published":"True"},

        {"user":"null",
        "title":"Individual work",
        "text":"Each intern is expected to complete at least one ticket individually",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null"},
        ]
        
        results = CreateNoticeSerializer(data, many=True).data
        return Response(results, status=status.HTTP_200_OK)


class CreateNoticeView(views.APIView):

    def post(self, request):
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            payload={
                    "plugin_id": "612a3a914acf115e685df8e3",
                    "organization_id": "id",
                    "collection_name": "mycollection",
                    "bulk_write": False,
                    "object_id": "1212",
                    "filter": {},
                    "payload": serializer.data
                    }
            external_api_url = 'https://zccore.herokuapp.com/data/write'
            
            res = requests.post(external_api_url, payload)
            return Response({"post_data":payload, "server_response":res.json()}, status=status.HTTP_201_CREATED)


           
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
                "message": "Your reaction could not be updated"
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

def deleteNotice(request):
    Message = {"output":"Your notice has been successfully deleted."}

    return JsonResponse(Message, status=200)


class EditNoticeAPIView(views.APIView):

    def put(self, request):
        serializer = EditNoticeSerializer(data=request.data)
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


    def patch(self, request):
        serializer = EditNoticeSerializer(data=request.data)
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

class CommentDeleteAPIView(views.APIView):

    def delete(self, pk):
        return Response({"message": "You have successfully deleted your comment"}, status=status.HTTP_200_OK)

# get all notices by a user
class AllUserNoticesView(views.APIView):

    """GET request to display/retrieve all existing notices"""
    def get(self, request):
        data= [
        {"user":"ubajoseph",
        "title":"weekly update meeting",
        "text":"the weekly update meeting has been postponed",
        "photo_url":"www.github.com",
        "video_url":"null",
        "audio_url":"null"},

        {"user":"ubajoseph",
        "title":"volunteers needed",
        "text":"there is na need for additional devop developers",
        "photo_url":"www.facebook.com",
        "video_url":"www.youtube.com",
        "audio_url":"www.vimeo.com",
        "published":"True"},

        {"user":"ubajoseph",
        "title":"change of github repo",
        "text":"all github repo has been renamed",
        "photo_url":"www.github.com",
        "video_url":"null",
        "audio_url":"null"},

        {"user":"ubajoseph",
        "title":"promotion exam",
        "text":"there will be a promotion exam on tuesday next week",
        "photo_url":"www.facebook.com",
        "video_url":"www.youtube.com",
        "audio_url":"null"},
        ]
        
        results = CreateNoticeSerializer(data, many=True).data
        return Response(results, status=status.HTTP_200_OK)
