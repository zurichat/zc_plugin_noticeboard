from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from django.http import JsonResponse, request
from rest_framework import views, status, views
from rest_framework.serializers import Serializer
from .storage import db
from .serializers import CreateNotice
from django.http import HttpResponse
from rest_framework.generics import ListAPIView


@api_view(['GET'])
def sidebar(request):

    org_id = request.GET.get('org')
    user_id = request.GET.get('user')

    if org_id and user_id:

        res = requests.get(
            f"https://api.zuri.chat/organizations/{org_id}/members/{user_id}").json()

        if res['status'] == 200:

            sidebar = {
                "name": "Noticeboard Plugin",
                "description": "Displays Information On A Noticeboard",
                        "plugin_id": "6139ca8d59842c7444fb01fe",
                        "organisation_id": f"{org_id}",
                        "user_id": f"{user_id}",
                        "group_name": "Noticeboard",
                        "show_group": False,
                        "joined_rooms": [],
                        "public_rooms": [
                            {
                                "title": "jokes",
                                "id": "DFGfH-EDDDDS-DFDDF",
                                "unread": 342,
                                "members": 32,
                                "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-kPo-vAmp_GrCZbnmqT6PMU5Wi5BLwgvPQ&usqp=CAU",
                                "action": "open",
                                "auto-join": True
                            }
                        ]
            }
            return Response({"status": True, "data": sidebar}, status=status.HTTP_200_OK)
        return Response({"status": False, "message": res["message"]}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"status": False, "message": "Check your query parameter"})


def install(request):
    install = {
        "name": "Noticeboard Plugin",
        "description": "Creates Notice",
        "plugin_id": "6139ca8d59842c7444fb01fe",
    }
    return JsonResponse(install, safe=False)


class CreateNoticeAPIView(views.APIView):

    def post(self, request):
        serializer = CreateNotice(data=request.data)
        if serializer.is_valid():
            db.save("noticeboard", "613a1a3b59842c7444fb0220", serializer.data)
            return Response(
                {
                    "success": True,
                    "data": serializer.data,
                    "message": "Successfully created"
                },
                status=status.HTTP_201_CREATED)
        return Response(
            {
                "success": False,
                "message": "Boss do am again, e no create. No vex"
            },
            status=status.HTTP_400_BAD_REQUEST)


class NoticeAPI(views.APIView):

    def get(self, request):
        notice = db.read("noticeboard", "613a1a3b59842c7444fb0220")
        if notice['status'] == 200:
            return Response(
                {
                    "status": True,
                    "data": notice['data'],
                    "message": "Successfully retrieved"
                },
                status=status.HTTP_200_OK)
        return Response(
            {
                "success": False,
                "message": "Boss do am again, e no retrieve. No vex"
            },
            status=status.HTTP_400_BAD_REQUEST)


class UpdateNoticeAPIView(views.APIView):

    def put(self, request):
        serializer = CreateNotice(data=request.data)
        if serializer.is_valid():
            db.update("noticeboard", "613a1a3b59842c7444fb0220",
                      serializer.data, object_id="613e4cf015fb2424261b6633")
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
        notice = db.delete("613a1a3b59842c7444fb0220",
                           "noticeboard", "613f47b26173056af01b4a56")
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
                all_notice = list(
                    filter(lambda x: x['body'] == query or x['title'] == query, all_notice))
            return Response(
                {
                    "status": True,
                    "data": all_notice,
                    "message": "Successfully retrieved"
                },
                status=status.HTTP_200_OK)
        return Response(
            {
                "success": False,
                "message": "Failed"
            },
            status=status.HTTP_400_BAD_REQUEST)
