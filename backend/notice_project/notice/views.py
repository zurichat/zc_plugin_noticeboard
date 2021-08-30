from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .models import NoticeBoard
from .serializers import NoticeBoardSerializer
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

# Create Noticeboard CRUD API endpoints
@csrf_exempt
def board_list(request):

    if request.method == 'GET':
        note = NoticeBoard.objects.all()
        serializer = NoticeBoardSerializer(note, many=True)
        return JsonResponse(serializer.data, safe=False)


    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NoticeBoardSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)  


@csrf_exempt
def board_detail(request, pk):
    """
    Retrieve, update or delete data.
    """
    try:
        note = NoticeBoard.objects.get(pk=pk)
    except NoticeBoard.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = NoticeBoardSerializer(note)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = NoticeBoardSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        note.delete()
        return HttpResponse(status=204)           
