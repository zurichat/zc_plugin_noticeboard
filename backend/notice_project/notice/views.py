from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CreateNoticeSerializer, CommentReactionSerializer, EditNoticeSerializer, \
    CommentCreateSerializer, CreateReactionSerializer,CreateNoticeV2Serializer
import requests
from django.http import JsonResponse
from rest_framework import views, status
from .storage import Database

class AllNoticesView(views.APIView):
    """GET request to display/retrieve all existing notices"""

    def get(self, request):
        data = [
            {"title": "Management meeting",
             "text": "Management has updated the design scedule",
             "photo_url": "null",
             "video_url": "null",
             "audio_url": "null"},

            {"title": "Stage 5",
             "text": "Complete a ticket to move to stage 5",
             "photo_url": "null",
             "video_url": "null",
             "audio_url": "null",
             "published": "True"},

            {"title": "Individual work",
             "text": "Each intern is expected to complete at least one ticket individually",
             "photo_url": "null",
             "video_url": "null",
             "audio_url": "null"},
        ]

        results = CreateNoticeSerializer(data, many=True).data
        return Response(results, status=status.HTTP_200_OK)


class RetrieveNoticeCommentsView(views.APIView):

    def get(self, request, *args, **kwargs):
        payload = [{
            "Title": "You have been promoted to admin",
            "Time": "3 hours ago",
            "Comment": "Thanks received",
            "text": "Management has updated the design scedule",
        }, {
            "Title": "You have been promoted to admin",
            "Time": "6 hours ago",
            "Comment": "Each intern is expected to complete at least one ticket individually",
            "text": "Project Got update by bill",
        }, {
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
        }, status=status.HTTP_200_OK)


class CreateNoticeView(views.APIView):

    def post(self, request):
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            payload = {
                "plugin_id": "612a3a914acf115e685df8e3",
                "organization_id": "id",
                "collection_name": "mycollection",
                "bulk_write": False,
                "object_id": "1212",
                "filter": {},
                "payload": serializer.data
            }
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def sidebar(request):
    sidebar = {
                "name" : "Noticeboard Plugin",
                "description" : "Displays Information On A Noticeboard",
                "plugin_id" : "6139ca8d59842c7444fb01fe",
                "organisation_id" : "FRYIUOHF",
                "user_id" : "613a1e9259842c7444fb0225",
                "group_name" : "Noticeboard",
                "show_group" : False,
                "joined_rooms": [],
                "public_rooms": [
                    {
                        "title": "jokes",
                        "id": "DFGfH-EDDDDS-DFDDF",
                        "unread": 342,
                        "members": 32,
                        "icon" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-kPo-vAmp_GrCZbnmqT6PMU5Wi5BLwgvPQ&usqp=CAU",
                        "action" : "open",
                        "auto-join" : True
                    }
                ]
            }
    return Response(sidebar, status=status.HTTP_200_OK)

    
def install(request):
     install = {
        "name" : "Noticeboard Plugin",
        "description" : "Creates Notice",
        "plugin_id" : "6139ca8d59842c7444fb01fe",

     }
     return JsonResponse(install, safe=False)

@api_view(["POST"])
def store_notice(request):
    serializer = CreateNoticeV2Serializer(data=request.data)
    
    if serializer.is_valid():
        response = Database.save("Test_notice", notice_data=serializer.data)
        if response and response.get("status_code") == 201:
            return Response(
                data=response, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
