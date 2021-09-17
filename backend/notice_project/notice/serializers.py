from django.utils import timezone
from rest_framework import serializers
from .storage import db

class NoticeboardRoom(serializers.Serializer):
    room_id = serializers.UUIDField()
    title = serializers.CharField()
    unread = serializers.IntegerField()
    members = serializers.IntegerField()
    icon = serializers.URLField()
    action = serializers.CharField()

class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField(max_length = 255)
    created = serializers.DateTimeField(default_timezone=timezone.now())
    message = serializers.CharField(max_length = 255)
    
