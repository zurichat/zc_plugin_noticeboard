from django.utils import timezone
from rest_framework import serializers
from notice.utils import random_string

# Time Zone
time = timezone.now()
# Get Current Time
current_time = f"{time.hour + 1}:{time.minute}:{time.second}"
# Get Current Date
current_date = f"{time.month}-{time.day}-{time.year}"


class NoticeboardRoom(serializers.Serializer):
    """
    Serializer for noticeboard room
    """

    room_id = serializers.CharField(default=random_string, read_only=True)
    is_admin = serializers.CharField(
        max_length=25, allow_blank=True, allow_null=True, default="", read_only=True
    )
    room_name = serializers.CharField(max_length=100)
    private = serializers.BooleanField(default=False)
    room_member_id = serializers.ListField(
        child=serializers.CharField(max_length=50), default=[]
    )
    created_at = serializers.DateTimeField(default=timezone.now)


class CreateNoticeSerializer(serializers.Serializer):
    """
    Serializer for Create notice serializer
    """

    title = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)
    author_name = serializers.CharField()
    author_username = serializers.CharField()
    author_img_url = serializers.CharField()
    message = serializers.CharField()
    media = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, required=False, default=[]
    )
    # bookmarked = serializers.BooleanField(default=False)
    views = serializers.CharField(default=0)


class SubscribeSerializer(serializers.Serializer):
    """
    Serializer for the Subscribe option
    """

    email = serializers.CharField()


class UnsubscribeSerializer(serializers.Serializer):
    """
    Serializer for the Unsubscribe option
    """

    email = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)


class NoticeReminderSerializer(serializers.Serializer):
    """
    Serializer for the NoticeReminder option
    """

    title = serializers.CharField(max_length=255)
    time_created = serializers.TimeField(default=current_date)
    date_created = serializers.DateField(default=current_time)
    schedule_time = serializers.TimeField()
    schedule_date = serializers.DateField()
    email = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=255)
    notice_id = serializers.CharField()


class BookmarkNoticeSerializer(serializers.Serializer):
    """
    Serializer for the Bookmark notice option
    """

    notice_id = serializers.CharField()
    user_id = serializers.CharField()


class DraftSerializer(serializers.Serializer):
    """
    Serializer for the Draft
    """

    title = serializers.CharField(max_length=255)
    time = serializers.TimeField(default=timezone.now)
    date = serializers.DateField()


class SchedulesSerializer(serializers.Serializer):
    """
    Serializer for the Schedule Notice option
    """

    title = serializers.CharField(max_length=255)
    created = serializers.DateTimeField(default=timezone.now)
    author_name = serializers.CharField()
    author_username = serializers.CharField()
    author_img_url = serializers.CharField()
    message = serializers.CharField()
    scheduled_time = serializers.CharField()
    views = serializers.CharField(default=0)
    org_id = serializers.CharField()


class InstallSerializer(serializers.Serializer):
    """
    Serializer for Installing A Plugin
    """

    org_id = serializers.CharField()
    user_id = serializers.CharField()


class UninstallSerializer(serializers.Serializer):
    """
    Serializer for Uninstalling A Plugin
    """

    org_id = serializers.CharField()
    user_id = serializers.CharField()


class AddMemberToRoom(serializers.Serializer):
    """Serializer for adding a member to a room"""

    room_id = serializers.CharField(max_length=50)
    member_ids = serializers.ListField(child=serializers.CharField(max_length=50))
