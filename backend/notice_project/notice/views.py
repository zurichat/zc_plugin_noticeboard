from rest_framework.decorators import api_view
from rest_framework.response import Response
import datetime
import requests
from django.http import JsonResponse, request
from rest_framework import views, status, views
from .storage import db
from .serializers import NoticeboardRoom, CreateNoticeSerializer
from django.http import HttpResponse
from rest_framework.generics import ListAPIView
import uuid


@api_view(['GET'])
def sidebar(request):

    org_id = request.GET.get('org')
    user_id = request.GET.get('user')

    if org_id and user_id:

        res = requests.get(f"https://api.zuri.chat/organizations/{org_id}/members/{user_id}").json()

        if res['status'] == 200:

            res = requests.get("noticeboard_room", org_id).json()
            if res['status'] == 200 and res is not None:
                public_rooms = res['data']
            else:
                public_rooms = []

            sidebar = {
                        "name" : "Noticeboard Plugin",
                        "description" : "Displays Information On A Noticeboard",
                        "plugin_id" : "613fc3ea6173056af01b4b3e",
                        "organisation_id" : f"{org_id}",
                        "user_id" : f"{user_id}",
                        "group_name" : "Noticeboard",
                        "show_group" : False,
                        "joined_rooms": [],
                        "public_rooms": public_rooms
                    }
            return Response({"status":True, "data":sidebar}, status=status.HTTP_200_OK)
        return Response({"status":False, "message":res["message"]}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"status":False, "message":"Check your query parameter"})

@api_view(['POST'])
def create_room(request):
    org_id = "613a1a3b59842c7444fb0220"
    serializer = NoticeboardRoom(data=request.data)
    if serializer.is_valid():
        db.save("noticeboard_room", org_id, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_room(request):
    org_id = "613a1a3b59842c7444fb0220"
    data = db.read("noticeboard_room", org_id)
    return Response(data)


@api_view(['GET'])
def install(request):
    data = {
            "room_id": uuid.uuid4(),
            "title": "noticeboard",
            "unread": "0",
            "members": "0",
            "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-kPo-vAmp_GrCZbnmqT6PMU5Wi5BLwgvPQ&usqp=CAU",
            "action": "open"
        }

    requests.post("https://noticeboard.zuri.chat/api/v1/create-notice-room", data=data)
    # requests.post("http://localhost:8000/api/v1/create-notice-room", data=data)

    install = {
        "name" : "Noticeboard Plugin",
        "description" : "Creates Notice",
        "plugin_id" : "613fc3ea6173056af01b4b3e",
    }
    return Response(install)


class CreateNewNotices(views.APIView):

    '''
    Create new notices
    '''

    def post(self, request):
        serializer = CreateNoticeSerializer(data=request.data)

        if serializer.is_valid():
            db.save(
                "noticeboard", 
                "613a1a3b59842c7444fb0220", 
                notice_data=serializer.data
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
class ViewNoticeAPI(views.APIView):

    def get(self):
        notice = db.read("noticeboard", "613a1a3b59842c7444fb0220")
        notices = notice.objects.all
        if notice['status'] == 200:
            return Response(
                {
                    "status": True,
                    "data": notices,
                },
                status=status.HTTP_200_OK)
        notices_serializer = CreateNoticeSerializer(notices, many=True)
        return JsonResponse(notices_serializer.data, safe=False)


class NoticeDetail(views.APIView):
    # find notice by pk (id)

    def get(self, pk):
        notice = db.read("noticeboard", "613a1a3b59842c7444fb0220")
        try:
            notice_detail = notice.objects.get(pk=pk)
        except notice.DoesNotExist:
            return JsonResponse({'message': 'Notice does not exist'}, status=status.HTTP_404_NOT_FOUND)


class UpdateNoticeAPIView(views.APIView):

    def put(self, request):
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.update("noticeboard", "613a1a3b59842c7444fb0220", serializer.data, object_id="613e4cf015fb2424261b6633")
            return Response(
                {
                    "success": True,
                    "data": serializer.data,
                    "message": "Successfully updated"
                },
                status=status.HTTP_201_CREATED)
        return Response(
            {
                "success": False,
                "message": "Boss do am again, e no create. No vex"
            },
            status=status.HTTP_400_BAD_REQUEST)


class DeleteNotice(views.APIView):

    def delete(self, request):
        notice = db.delete("613a1a3b59842c7444fb0220", "noticeboard", "613f47b26173056af01b4a56")
        if notice['status'] == 200:
            return Response(
                {
                    "success": True,
                    "message": "Deleted successfully"
                },
                status=status.HTTP_200_OK)
        return Response(
            {
                "success": False,
                "message": "Could not delete"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class search(ListAPIView):
    def get(self, request):
        notice = db.read("noticeboard", "613a1a3b59842c7444fb0220")
        if notice['status'] == 200:
            all_notice = notice['data']
            query = request.GET.get("q")

            if query:
                all_notice = list(filter(lambda x:x['title'] == query, all_notice))
            return Response(
            {
                "status":True,
                "data": all_notice,
                "message":"Successfully retrieved"
            }, 
            status=status.HTTP_200_OK)
        return Response(
            {
                "success": False,
                "message":"Failed"
            },
            status=status.HTTP_400_BAD_REQUEST)
