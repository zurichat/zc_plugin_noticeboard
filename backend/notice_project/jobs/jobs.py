from django.conf import settings
from notice.serializers import NoticeReminderSerializer
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from notice.storage import db
import json, requests


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


def mytest():
    
    print("I am testing")