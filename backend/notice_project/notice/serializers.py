from rest_framework import serializers
import uuid

class NoticeboardRoom(serializers.Serializer):
    id = serializers.UUIDField()
    title = serializers.CharField()
    unread = serializers.IntegerField()
    members = serializers.IntegerField()
    icon = serializers.URLField()
    action = serializers.CharField()

    
class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField(max_length = 255)
    department = serializers.CharField(max_length = 255)
    message = serializers.CharField(max_length = 255)
