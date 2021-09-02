from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from .serializers import CreateNoticeSerializer
import requests


# Create your views here.
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
            # return Response(res.json(), status=status.HTTP_201_CREATED)
            # return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
 
    
def home(request):
    pass

def endpoints(request):
    data = {
        "viewNotice": "http://localhost:8000/api/viewNotice/",
        "sendNotice": "http://localhost:8000/api/sendNotice/",
        "editTimsestamp": "http://localhost:8000/api/setNoticeTimestamp/",
        "endpoints": "http://localhost:8000/api/endpoints/",
    }

    return JsonResponse(data, status=200)

def viewNotice(request):
    data = {
        "id": 1,
        "username": "Bruce Wayne",
        "date":"24 Hours ago",
        "timestamp": "3 Hours ago",
        "views": "21",
        "likes": "12",
        "title": "App Testing Event",
        "info": ""
    }

    return JsonResponse(data, status=200)


def sendNotice(request):
    data = {
        "username": "Daniel",
        "recipient": "ZetsuArmy",
        "title": "Does It Work?",
        "fileUploaded": "",
        "message": "Yes, It Works!!!"
    }

    return JsonResponse(data, status=200)

def setNoticeTimestamp(request):
    data = {
        "timestamp": "3 Hours ago"
    }
    
    return JsonResponse(data, status=200)