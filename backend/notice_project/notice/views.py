from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

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
