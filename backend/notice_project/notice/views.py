from requests.api import delete
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from rest_framework import views, status, views
from .storage import db
from .serializers import NoticeboardRoom, CreateNoticeSerializer, UnsubscribeSerializer
from rest_framework.generics import ListAPIView
from .email import sendmassemail
import re


@api_view(['GET'])
def sidebar(request):

    org_id = request.GET.get('org')
    user_id = request.GET.get('user')

    if org_id and user_id:

        # headers = {"Content-Type":"application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpVd09EWXhOWHhIZDNkQlIwUlplRTVIVlhoWlYwMHpXbXBOZUZsVVl6QmFWRUV5VDBkVk1GcEVUWGhPZHowOWZBOVRBS2xoaHVZNjhELWRwa3ZEcTVjeDJ4UWZGaXhDc1FGRG9RRHZIblMwIiwiZW1haWwiOiJwYXBham9uYXR1czEwQHp1cmkuY2hhdCIsImlkIjoiNjE0ZTFhYzdmMzFhNzRlMDY4ZTRkMzE3Iiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6NzkzOTY4NjE3NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.NyfVxOLNDSCy0hUYJ5V4m0SbXZkwAD5_2nDG_z0OzsU"}

        res = requests.get(
            # f"https://api.zuri.chat/organizations/{org_id}/members/{user_id}", headers=headers).json()
            f"https://api.zuri.chat/organizations/{org_id}/members/{user_id}").json()

        if res['status'] == 200:

            # res = requests.get("noticeboard_room", org_id).json()
            # if res['status'] == 200 and res is not None:
            #     public_rooms = res['data']
            # else:
            #     public_rooms = []

            sidebar = {
                "name": "Noticeboard Plugin",
                "description": "Displays Information On A Noticeboard",
                        "plugin_id": "613fc3ea6173056af01b4b3e",
                        "organisation_id": f"{org_id}",
                        "user_id": f"{user_id}",
                        "group_name": "Noticeboard",
                        "show_group": False,
                        "joined_rooms": [],
                        # "public_rooms": public_rooms
            }
            return Response({"status": True, "data": sidebar}, status=status.HTTP_200_OK)
        return Response({"status": res['status'], "message": res["message"]}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"status": False, "message": "Check your query parameter"})


@api_view(['POST'])
def create_room(request):
    org_id = "6145b49e285e4a18402073bc"
    serializer = NoticeboardRoom(data=request.data)
    if serializer.is_valid():
        db.save("noticeboard_room", org_id, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_room(request):
    # org_id = "613a1a3b59842c7444fb0220"
    org_id = "6145b49e285e4a18402073bc"
    data = db.read("noticeboard_room", org_id)
    return Response(data)


@api_view(['GET'])
def install(request):
    org_id = "613a1a3b59842c7444fb0220"

    data = {
        "title": "noticeboard",
        "unread": "0",
        "members": "0",
        "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-kPo-vAmp_GrCZbnmqT6PMU5Wi5BLwgvPQ&usqp=CAU",
        "action": "open"
    }

    requests.post(f"https://noticeboard.zuri.chat/api/v1/{org_id}/create-room", data=data)
    # requests.post("http://localhost:8000/api/v1/create-room", data=data)

    install = {
        "name": "Noticeboard Plugin",
        "description": "Creates Notice",
        "plugin_id": "613fc3ea6173056af01b4b3e",
    }
    return Response(install)


class CreateNewNotices(views.APIView):

    '''
    Create new notices
    '''
    
    def post(self, request):
        org_id = "613a1a3b59842c7444fb0220"
        headers={}
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.save(
                "noticeboard",
                # "613a1a3b59842c7444fb0220",
                org_id,
                notice_data=serializer.data
            )

            db.post_to_centrifugo(serializer.data)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateNoticeAPIView(views.APIView):

    def put(self, request, id):
        org_id = "613a1a3b59842c7444fb0220"
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.update("noticeboard", org_id, serializer.data, object_id=id)
            return Response(
                {
                    "success": True,
                    "data": serializer.data,
                    "message": "Notice has been successfully updated"
                },
                status=status.HTTP_201_CREATED)
        return Response(
            {
                "success": False,
                "message": "Notice not updated, Please Try Again"
            },
            status=status.HTTP_400_BAD_REQUEST)


class search(ListAPIView):
    def get(self, request):

        org_id = "613a1a3b59842c7444fb0220"

        notice = db.read("noticeboard", org_id)
        if notice['status'] == 200:
            all_notice = notice['data']

            def func(data, keyword):
                new_data = []
                for d in data:
                    if keyword.lower() in d['title'].lower() or keyword.lower() in d['message'].lower():
                        new_data.append(d)
                return new_data

            query = request.GET.get("q")

            if query:
                all_notice = func(all_notice, query)
                # print(all_notices)
                # all_notice = list(
                #     filter(lambda x: x['title'].lower().startswith(query.lower()), all_notice))
                
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


class DeleteNotice(views.APIView):

    """Delete a notice from the database"""

    def delete(self, request, object_id):
        org_id = "613a1a3b59842c7444fb0220"
        try:
            db.delete(
                collection_name='noticeboard_room',
                org_id=org_id,
                object_id=object_id
            )
            return Response(
                {
                    "success": True,
                    "message": "Delete Operation Successful"
                },
                status=status.HTTP_200_OK)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Delete Operation Failed. Object does not exist in the database"
                },
                status=status.HTTP_404_NOT_FOUND)


class ViewNoticeAPI(views.APIView):

    def get(self, request):
        org_id = "613a1a3b59842c7444fb0220"
        notice = db.read("noticeboard", org_id)
        get_data=notice["data"]
        reversed_list = get_data[::-1]
        print(reversed_list)
        notice.update(data=reversed_list)
        if notice['status'] == 200:
            print(notice)
            return Response(notice, status=status.HTTP_200_OK)
        return Response({"status": False, "message": "retrieved unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)


class NoticeDetail(views.APIView):

    def get(self, request, id):
        org_id = "613a1a3b59842c7444fb0220"
        notice = db.read("noticeboard", org_id, filter={"id": id})
        if notice["status"] == 200:
            return Response({"status": True, "data": notice["data"], "message": "sucessfully retrieved"}, status=status.HTTP_200_OK)
        return Response({"status": False, "message": "retrieved unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def add_user(request):
    data = {"message":"User has been added"}
    return Response(data)



@api_view(['GET'])
def emailNotificaion(request):
    org_id=request.GET.get('org')
    # org_id="6145b49e285e4a18402073bc"
    sendemail=request.GET.get('sendemail')

    if org_id and sendemail == 'True':
        """
         Retrieve Organization Members

        """
        res = requests.get(f"https://api.zuri.chat/organizations/{org_id}/members").json()
        notice = db.read("noticeboard_email_unsubscribers", org_id)
        if res['status'] == 200:
            try:
                for user in res['data']:
                    if user["role"] != "owner":
                        if notice['status'] == 200 and notice["data"] != None:
                            """
                                Somebody has Unsubscribed . The unsubscribe collection is not empty
                            """
                            print("Somebody has Unsubscribed")
                            for data in notice["data"]:
                                if data["user_id"] == user["_id"]:
                                    pass
                                else:
                                    sendmassemail("email/notify-users.html", {"user_id":user["_id"]}, "Hey \U0001f600, You have got a new Notice on the board", user['email'])
                        else:
                            """
                                Nobody has Unsubscribed . The unsubscribe collection is empty
                            """
                            sendmassemail("email/notify-users.html", {"user_id":user["_id"]}, "Hey \U0001f600, You have got a new Notice on the board", user['email'])

                # return Response({"data": {"Message": "Emails have been sent"}}, status=status.HTTP_200_OK)
                return Response({"data": res}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"status": 401, "message": "An error occured why sending emails"})
        return Response({"status": res['status'], "message": res["message"]}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"status": False, "message": "No email Sent. Check your query parameter"})



class Unsubscribe(views.APIView):
    def get(self, request):
        org_id=request.GET.get('org')
        if org_id:
            notice = db.read("noticeboard_email_unsubscribers", org_id)
            if notice['status'] == 200:
                # print(notice)
                pass
            return Response(notice, status=status.HTTP_200_OK)
        return Response({"status": 401, "message": "An error occured"})

    def post(self, request):
        org_id=request.GET.get('org')
        if org_id:
            """
            Add Unsubscibers to a new table
            """
            notice = db.read("noticeboard_email_unsubscribers", org_id)
            serializer = UnsubscribeSerializer(data=request.data)
            if notice['status'] == 200:
                if notice["data"] != None:
                    for data in notice["data"]:
                        if data["user_id"] == request.data["user_id"]:
                            return Response(data={"Message":"User is already Unsubscribed"}, status=502)
                        else:
                            if serializer.is_valid():
                                db.save(
                                    "noticeboard_email_unsubscribers",
                                    org_id,
                                    notice_data=serializer.data
                                )
                            return Response(data={"Message":"You have successfully Unsubscribed"}, status=status.HTTP_201_CREATED)
                else:
                    if serializer.is_valid():
                        db.save("noticeboard_email_unsubscribers", org_id, notice_data=serializer.data)
                        return Response(data={"Message":"You have successfully Unsubscribed"}, status=status.HTTP_201_CREATED)
        return Response({"status": False, "message": "Check your query parameter"})
    
    def delete(self, request):
        org_id=request.GET.get('org')
        object_id=request.GET.get('object')
        if org_id and object_id:
            try:
                db.delete(collection_name='noticeboard_email_unsubscribers',org_id=org_id,object_id=object_id)
                return Response({"success": True, "message": "Delete Operation Successful"}, status=status.HTTP_200_OK)
            except:
                return Response({"success": False,"message": "Delete Operation Failed. Object does not exist in the database"},status=status.HTTP_404_NOT_FOUND)
        return Response({"status": False, "message": "Check your query parameter"})
