from django.utils import timezone
from rest_framework import serializers
from django.utils import timezone


class NoticeboardRoom(serializers.Serializer):
    title = serializers.CharField()
    unread = serializers.IntegerField()
    members = serializers.IntegerField()
    icon = serializers.URLField()
    action = serializers.CharField()


class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now())
    message = serializers.CharField(max_length=255)
