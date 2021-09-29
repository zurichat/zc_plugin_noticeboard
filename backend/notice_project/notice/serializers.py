from django.db.models.fields import CharField
from django.utils import timezone
from rest_framework import serializers
from django.utils import timezone


class NoticeboardRoom(serializers.Serializer):
    title = serializers.CharField()
    icon = serializers.URLField()
    action = serializers.CharField()

class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)
    email = serializers.EmailField()
    author_email = serializers.CharField()
    message = serializers.CharField()

class UnsubscribeSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)

# class AddMemberToRoom(serializers.Serializer):
#     member_id = serializers.CharField(max_length=24)


