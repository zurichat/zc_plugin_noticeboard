from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from .serializers import CreateNoticeSerializer, CommentReactionSerializer
import requests

class AllNoticesView(views.APIView):

    """GET request to display/retrieve all existing notices"""
    def get(self, request):
        data= [
        {"title":"Management meeting",
        "text":"Management has updated the design scedule",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null"},

        {"title":"Stage 5",
        "text":"Complete a ticket to move to stage 5",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null",
        "published":"True"},

        {"title":"Individual work",
        "text":"Each intern is expected to complete at least one ticket individually",
        "photo_url":"null",
        "video_url":"null",
        "audio_url":"null"},
        ]
        
        results = CreateNoticeSerializer(data, many=True).data
        return Response(results, status=status.HTTP_200_OK)



class RetrieveNoticeCommentsView(views.APIView):
   
    
    def get(self, request,  *args, **kwargs):
        payload=[{
            "Title": "You have been promoted to admin",
            "Time": "3 hours ago",
            "Comment": "Thanks received",
            "text":"Management has updated the design scedule",
        },{
            "Title": "You have been promoted to admin",
            "Time": "6 hours ago",
            "Comment": "Each intern is expected to complete at least one ticket individually",
            "text":"Project Got update by bill",
    },{
            "Title": "Complete a ticket to move to stage 5",
            "Time": "1 day ago",
            "Comment": "Thanks received",
            "text": "I updated the design scedule",
    }
    ]
        return Response({
            "plugin_id": "612a3a914acf115e685df8e3",
            "organization_id": "id",
            "collection_name": "mycollection",
            "bulk_write": False,
            "filter": {},
            "Has Comment": True,
            "data": payload,
            "Comment_id": "1"
        },status=status.HTTP_200_OK)


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

class NoticeDeleteAPIView(views.APIView):
    def delete(self, pk):
        return Response({"message": "You have successfully deleted your notice"}, status=status.HTTP_200_OK)