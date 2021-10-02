from requests.api import delete
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from rest_framework import views, status, views
from .storage import db
from .serializers import NoticeboardRoom, CreateNoticeSerializer, SubscribeSerializer, UnsubscribeSerializer, NoticeReminderSerializer,DraftSerializer,SchedulesSerializer, BookmarkNoticeSerializer
from .email import sendmassemail
from .utils import user_rooms
from django.conf import settings
from .ScheduleStorage import schDb


@api_view(['GET'])
def sidebar_info(request):
    '''
    Returns the room the logged in user belongs to under Noticeboard plugin
    '''
    org_id = request.GET.get('org')
    user_id = request.GET.get('user')

    data = {
        "title": "Noticeboard",
        "icon": "https://media.istockphoto.com/vectors/notice-paper-with-push-pin-icon-in-trendy-flat-design-vector-id1219927783?k=20&m=1219927783&s=612x612&w=0&h=DJ9N_kyvpqh11qHOcD0EZVbM0NeBNC_08oViRjo7G7c=",
        "action": "open",
    }

    room = db.read('noticeboard', org_id)

    if room['status'] == 200:
        if room['data']:
            room = room['data'][0]
        else:
            requests.post(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/create-room", data=data)
            # room = requests.post(f"http://localhost:8000/api/v1/organisation/{org_id}/create-room", data=data)
    else:
        requests.post(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/create-room", data=data)
        # room = requests.post(f"http://localhost:8000/api/v1/organisation/{org_id}/create-room", data=data)

    if org_id and user_id:
        sidebar = {
            "name": "Noticeboard Plugin",
            "description": "Displays Information On A Noticeboard",
            "plugin_id": settings.PLUGIN_ID,
            "organisation_id": f"{org_id}",
            "user_id": f"{user_id}",
            "group_name": "Noticeboard",
            "show_group": False,
            "public_rooms": [],
            "joined_rooms": user_rooms(org_id, user_id)
        }
        return Response(sidebar)
    return Response({"message": "org id or user id is None"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_room(request, org_id):
    '''
    Creates a room for the organisation under Noticeboard plugin
    '''
    # org_id = "6145b49e285e4a18402073bc"
    # org_id = "614679ee1a5607b13c00bcb7"
    serializer = NoticeboardRoom(data=request.data)
    if serializer.is_valid():
        db.save("noticeboard_room", org_id, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_room(request, org_id):
    '''
    Gets all the rooms created under the Noticeboard plugin
    '''
    # org_id = "613a1a3b59842c7444fb0220"
    # org_id = "6145b49e285e4a18402073bc"
    # org_id = "614679ee1a5607b13c00bcb7"
    data = db.read("noticeboard_room", org_id)
    return Response(data)


@api_view(['GET'])
def install(request):
    '''
    This endpoint is called when an organisation wants to install 
    the Noticeboard plugin for their workspace
    '''
    install = {
        "name": "Noticeboard Plugin",
        "description": "Creates Notice",
        "plugin_id": settings.PLUGIN_ID,
    }
    return Response(install)


class CreateNewNotices(views.APIView):

    '''
    Create new notices
    '''
    
    def post(self, request, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.save(
                "noticeboard",
                # "613a1a3b59842c7444fb0220",
                org_id,
                notice_data=serializer.data
            )

            # updated_data = db.read("noticeboard", org_id)

            created_notice = {
                "event":"create_notice",
                "data": serializer.data
            }


            response = requests.get(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/get-room")
            room = response.json()
            room_id = room["data"][0]["_id"]
            print(room_id)

            db.post_to_centrifugo(room_id,created_notice)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateNoticeAPIView(views.APIView):
    '''
    Update A Notice In A Database
    '''

    def put(self, request, id, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        serializer = CreateNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.update("noticeboard", org_id, serializer.data, object_id=id)

            data = db.read("noticeboard", org_id)

            updated_data = {
                "event":"update_notice",
                "data":data
            }

            response = requests.get(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/get-room")
            room = response.json()
            room_id = room["data"][0]["_id"]
            print(room_id)

            db.post_to_centrifugo(room_id, updated_data)

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


class DeleteNotice(views.APIView):

    """Delete a notice from the database"""

    def delete(self, request, object_id, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        try:
            db.delete(
                collection_name='noticeboard',
                org_id=org_id,
                object_id=object_id
            )

            data = db.read('noticeboard', org_id)

            updated_data = {
                "event":"delete_notice",
                "data":data
            }

            response = requests.get(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/get-room")
            room = response.json()
            room_id = room["data"][0]["_id"]
            print(room_id)

            db.post_to_centrifugo(room_id, updated_data)

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
    '''
    This endpoint returns all the notices created under a particular organisation in the database
    '''

    def get(self, request, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
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
    '''
    This returns the detail of a particular notice under the organisation
    '''

    def get(self, request, id, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        notice = db.read("noticeboard", org_id, filter={"id": id})
        if notice["status"] == 200:
            try:
                get_data=notice["data"]
                query = request.GET.get('query')
                if query:
                    views = get_data['views']
                    count = count_views(views, query)
                    get_data['views'] = count
                    serializer = CreateNoticeSerializer(data=get_data)
                    if serializer.is_valid():
                        db.update("noticeboard", org_id, serializer.data, object_id=id)
                        return Response({"status": True, "data": notice["data"], "message": "sucessfully retrieved"}, status=status.HTTP_200_OK)
            except:
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
                                    sendmassemail("email/notify-users.html", {"user_id":user["_id"], "org": org_id}, "Hey \U0001f600, You have got a new Notice on the board", user['email'])
                        else:
                            """
                                Nobody has Unsubscribed . The unsubscribe collection is empty
                            """
                            sendmassemail("email/notify-users.html", {"user_id":user["_id"],  "org": org_id}, "Hey \U0001f600, You have got a new Notice on the board", user['email'])

                # return Response({"data": {"Message": "Emails have been sent"}}, status=status.HTTP_200_OK)
                return Response({"data": res}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"status": 401, "message": "An error occured why sending emails"})
        return Response({"status": res['status'], "message": res["message"]}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"status": False, "message": "No email Sent. Check your query parameter"})


class Subscribe(views.APIView):
    def get(self, request):
        org_id=request.GET.get('org')
        if org_id:
            notice = db.read("noticeboard_email_subscribers", org_id)
            if notice['status'] == 200:
                pass
            return Response(notice, status=status.HTTP_200_OK)
        return Response({"status": 401, "message": "An error occured"})

    def post(self, request):
        org_id=request.GET.get('org')
        if org_id:
            """
            Add Subscibers to a new table
            """
            notice = db.read("noticeboard_email_subscribers", org_id)
            serializer = SubscribeSerializer(data=request.data)
            if notice['status'] == 200:
                if notice["data"] != None:
                    for data in notice["data"]:
                        if data["user_id"] == request.data["user_id"]:
                            return Response(data={"Message":"User is already Subscribed"}, status=502)
                        else:
                            if serializer.is_valid():
                                db.save(
                                    "noticeboard_email_Subscribers",
                                    org_id,
                                    notice_data=serializer.data
                                )
                            return Response(data={"Message":"You have successfully Subscribed"}, status=status.HTTP_201_CREATED)
                else:
                    if serializer.is_valid():
                        db.save("noticeboard_email_subscribers", org_id, notice_data=serializer.data)
                        return Response(data={"Message":"You have successfully Subscribed"}, status=status.HTTP_201_CREATED)
        return Response({"status": False, "message": "Check your query parameter"})


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

class NoticeReminder(views.APIView):
    '''
        For creating reminders.
    '''
    def post(self, request):
        serializer = NoticeReminderSerializer(data=request.data)
        if serializer.is_valid():
            db.save(
                "noticeboard",
                "613a1a3b59842c7444fb0220",
                notice_data=serializer.data
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookmarkNotice(views.APIView):

    def get(self, request, org_id, user_id):
        '''
        Retrieve all the notices a particular user has bookmarked
        '''
        bookmarked_notices = db.read('bookmark_notice', org_id, filter={"user_id":user_id})
        if bookmarked_notices['status'] == 200:
            return Response(bookmarked_notices, status=status.HTTP_200_OK)
        return Response({"message":"Notice does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CreateBookmark(views.APIView):

    def post(self, request, org_id):
        '''
        This endpoint enables a user to bookmark a notice
        '''
        serializer = BookmarkNoticeSerializer(data=request.data)
        if serializer.is_valid():
            db.save('bookmark_notice', org_id, serializer.data)

            response = requests.get(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/get-room")
            room = response.json()
            room_id = room["data"][0]["_id"]
            print(room_id)

            data = {
                "event":"create_bookmark",
                "data":serializer.data
            }

            db.post_to_centrifugo(room_id, data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteBookmarkedNotice(views.APIView):

    def delete(self, request, org_id, id):
        '''
        This endpoint enables a user delete a bookmarked notice
        '''
        bookmarked_notice = db.delete(org_id, 'bookmark_notice', id)

        bookmarked_data = db.read('bookmark_notice', org_id)

        data = {
            "event":"delete_bookmark",
            "data":bookmarked_data
        }

        response = requests.get(f"https://noticeboard.zuri.chat/api/v1/organisation/{org_id}/get-room")
        room = response.json()
        room_id = room["data"][0]["_id"]
        print(room_id)

        db.post_to_centrifugo(room_id, data)

        if bookmarked_notice['status'] == 200:
            return Response({"message":"successfully deleted bookmarked notice"}, status=status.HTTP_200_OK)
        return Response({"message":"could not delete bookmarked notice"}, status=status.HTTP_404_NOT_FOUND)

class NoticeDraft(views.APIView):
    '''
        For creating Drafts
    '''
    def post(self, request, org_id):
        serializer = DraftSerializer(data=request.data)
        if serializer.is_valid():
            db.save(
                "noticeboard",
                org_id,
                notice_data=serializer.data
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScheduleNotices(views.APIView):
    '''
        For scheduling notices
    '''
    @swagger_auto_schema(request_body=SchedulesSerializer)
    def post(self, request, org_id):
        organization_id = request.POST.get('org_id')
        print(organization_id)
        serializer = SchedulesSerializer(data=request.data)
        if serializer.is_valid():
            schDb.scheduleSave(
                "schedules",
                notice_data=serializer.data
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ViewSchedule(views.APIView):
    '''
    This endpoint returns all the notices created under a particular organisation in the database
    '''

    def get(self, request, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        notice = schDb.scheduleRead("schedules", " ")
        get_data=notice["data"]
        reversed_list = get_data[::-1]
        print(reversed_list)
        notice.update(data=reversed_list)
        if notice['status'] == 200:
            print(notice)
            return Response(notice, status=status.HTTP_200_OK)
        return Response({"status": False, "message": "retrieved unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)

class AttachFile(views.APIView):
    """
    This endpoint is a send message endpoint that can take files, upload them
    and return the urls to the uploaded files to the media list in the message
    serializer
    This endpoint uses form data
    The file must be passed in with the key "file"
    """
    def get(self, request, org_id):
        # org_id = "613a1a3b59842c7444fb0220"
        notice = db.read("noticeboard", org_id)
        get_data=notice["data"]
        reversed_list = get_data[::-1]
        print(reversed_list)
        notice.update(data=reversed_list)
        if notice['status'] == 200:
            print(notice)
            return Response(notice, status=status.HTTP_200_OK)
        return Response({"status": False, "message": "retrieved unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, org_id):
        print(request.FILES)
        token = request.META.get("HTTP_AUTHORIZATION")
        if request.FILES:
            file_urls = []
            files = request.FILES.getlist("file")
            if len(files) == 1:
                for file in request.FILES.getlist("file"):
                    file_data = db.upload(file=file, token=token)
                    if file_data["status"] == 200:
                        for datum in file_data["data"]["files_info"]:
                            file_urls.append(datum["file_url"])
                    else:
                        return Response(file_data)
            elif len(files) > 1:
                multiple_files = []
                for file in files:
                    multiple_files.append(("file", file))
                file_data = db.multiple_uplaod(files=multiple_files, token=token)
                if file_data["status"] == 200:
                    for datum in file_data["data"]["files_info"]:
                        file_urls.append(datum["file_url"])
                else:
                    return Response(file_data)
        else: 
            return Response({"success": False, "message": "No file has been attached"})

    
    def delete(self, request, org_id):
        file_url=request.GET.get('file_url')
        # org_id = "613a1a3b59842c7444fb0220"
        try:
            delete_file = db.delete_file(file_url=file_url)
            if delete_file["status"] == 200:
                return Response({
                    "success": True,
                    "message": "Delete Operation Successful"}, status=status.HTTP_200_OK)
        except:
            return Response(
                {
                    "success": False,
                    "message": "Delete Operation Failed. Object does not exist in the database"
                },
                status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def email_subscription(request):
    if request.method == 'POST':
        org_id = request.GET.get("org")
        user_id = request.GET.get("user")

        if org_id and user_id: # and user_id
            serializer = SubscribeSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user_data = {
                "user_id": user_id,
                "email": serializer.data["email"]
            }
            
            response_subscribers = db.read("test_email_subscribers", org_id)

            try:
                if response_subscribers["message"]=="collection not found" or response_subscribers["data"]==None:
                    db.save("test_email_subscribers", org_id, user_data)
                    return Response({"status": "subscription successful", "data": user_data}, status=status.HTTP_201_CREATED)

                elif response_subscribers["status"] == 200 and response_subscribers["data"]:
                    for user_obj in response_subscribers["data"]:
                        if user_id == user_obj["user_id"]:
                            return Response({"status": "already subscribed"}, status=status.HTTP_409_CONFLICT)

                    # if user_id doesn't exist, then the user is subscribed
                    db.save("test_email_subscribers", org_id, user_data)
                    return Response({"status": "subscription successful", "data": user_data}, status=status.HTTP_201_CREATED)

                else:
                    return Response({"error": response_subscribers["message"]}, status=response_subscribers["status"])

            except Exception as e:
                return Response(str(e))
        return Response({"status": "no action taken, check org and/or user parameter values"})















# ADDITIONS OR PATCHINGS DUE TO SIDEBAR

# class CreateNoticeView(CreateAPIView):
#     serializer_class = CreateNoticeSerializer

#     def post(self, request):
#         org_id = request.GET.get("org")
#         room_id = request.GET.get("room_id")

#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         notice = serializer.data

#         # adding a soft-foreign-key relationship between notices and room
#         notice["room_id"] = room_id
#         db.save("test_noticeboard", org_id, notice_data=notice)

#         # db.post_to_centrifugo(serializer.data)
#         return Response(notice, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# def room_noticeboard_list(request, room_id):
#     if request.method == 'GET':
#         org_id = request.GET.get('org')
#         room_notices_list = db.read("test_noticeboard", org_id, {"room_id": room_id})

#         if room_notices_list["status"] == 200:
#             return Response(room_notices_list["data"], status=status.HTTP_200_OK)
#         return Response({"error": room_notices_list["message"]}, status=room_notices_list["status"])
    

# @api_view(['POST'])
# def create_room_view(request):
#     if request.method == 'POST':
#         org_id = request.GET.get('org')
#         user_id = request.GET.get('user')

#         serializer = NoticeboardRoom(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         new_room_data = serializer.data
#         new_room_data["member_ids"] = [user_id]
#         db.save("test_noticeboard_room", org_id, new_room_data)
#         return Response(new_room_data, status=status.HTTP_201_CREATED)


# @api_view(['POST'])
# def add_member_to_room(request):
#     room_id = request.GET.get('room_id')
#     org_id = request.GET.get('org')

#     serializer = AddMemberToRoom(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     member_id = serializer.data["member_id"]

#     # retrieving room data
#     room_data = db.read("test_noticeboard_room", org_id, {"_id": room_id})["data"]
    
#     if room_data:
#         del room_data["_id"]
#         member_ids = room_data["member_ids"]

#         # updating member_ids field in room_data 
#         if member_id in member_ids:
#             return Response({"message": "user already exists in room"}, status=status.HTTP_409_CONFLICT)

#         member_ids.append(member_id)
#         db.update("test_noticeboard_room", org_id, room_data, room_id)
#         return Response({"message": "success", "data": room_data}, status=status.HTTP_200_OK)
#     return Response({"message": "requested room not found"}, status=status.HTTP_404_NOT_FOUND)
