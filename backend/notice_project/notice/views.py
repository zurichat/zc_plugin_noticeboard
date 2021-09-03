from django.shortcuts import render
from django.http import JsonResponse

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DictConverter, ReactionSerializer
# Create your views here.

def home(request):
    pass

def endpoints(request):
    data = {
        "viewNotice": "http://localhost:8000/api/viewNotice/",
        "sendNotice": "http://localhost:8000/api/sendNotice/",
        "editTimsestamp": "http://localhost:8000/api/setNoticeTimestamp/",
        "endpoints": "http://localhost:8000/api/endpoints/",

        "reactionList":"http://localhost:8000/api/reaction/",
        "deleteReaction":"http://localhost:8000/api/reaction/reaction i id here/",
        "eg":"http://localhost:8000/api/reaction/4/",
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


content = { 
            1:{'id':1, 'user':2, 'noticeid':1, 'reaction':'my reaction is here'}, 2:{'id':2, 'user':1, 'noticeid':3, 'reaction':'my reaction is here'}, 3:{'id':3, 'user':3, 'noticeid':2, 'reaction':'my reaction is here'}, 
            4:{'id':4, 'user':2, 'noticeid':3, 'reaction':'my reaction is here'}, 5:{'id':5, 'user':3, 'noticeid':5, 'reaction':'my reaction is here'}, 6:{'id':6, 'user':5, 'noticeid':3, 'reaction':'my reaction is here'},
            7:{'id':7, 'user':1, 'noticeid':3, 'reaction':'my reaction is here'}, 8:{'id':8, 'user':2, 'noticeid':2, 'reaction':'my reaction is here'}, 9:{'id':9, 'user':2, 'noticeid':5, 'reaction':'my reaction is here'} 
            }
		


class ReactionList(APIView):
	def get(self, request, format=None):
		global content
		obj = DictConverter(content)
		print(obj)
		serializer = ReactionSerializer(obj)
		return Response(serializer.data)
	

class ReactionDetail(APIView):
	def get(self, request, pk, format=None):
		global content
		obj = DictConverter(content[pk])
		serializer = ReactionSerializer(obj)
		return Response(serializer.data)

	def delete(self, request, pk, format=None):
		global content
		obj = DictConverter(content.pop(pk))
		#print(obj)
		
		return Response(status=status.HTTP_204_NO_CONTENT)
