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
    author_name = serializers.CharField()
    author_username = serializers.CharField()
    author_img_url = serializers.CharField()
    message = serializers.CharField()
    # bookmarked = serializers.BooleanField(default=False)
    views = serializers.CharField(default='me@email.com')


class UnsubscribeSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)


class SubscribeSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)


class NoticeReminderSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    time = serializers.TimeField(default=timezone.now)
    date = serializers.DateField()

class BookmarkNoticeSerializer(serializers.Serializer):
    notice_id = serializers.CharField()
    user_id = serializers.CharField()

class DraftSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    time = serializers.TimeField(default=timezone.now)
    date = serializers.DateField()

class SchedulesSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    time = serializers.TimeField(default=timezone.now)
    date = serializers.DateField()
    
# class AddMemberToRoom(serializers.Serializer):
#     member_id = serializers.CharField(max_length=24)
