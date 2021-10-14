from django.utils import timezone
from rest_framework import serializers

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

    title = serializers.CharField()
    icon = serializers.URLField()
    action = serializers.CharField()


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


# me


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
    organisation_id=serializers.CharField()
    user_id=serializers.CharField()

class UninstallSerializer(serializers.Serializer):
    organisation_id=serializers.CharField()
    user_id=serializers.CharField()

# class AddMemberToRoom(serializers.Serializer):
#     member_id = serializers.CharField(max_length=24)
