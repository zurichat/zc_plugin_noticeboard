from rest_framework import serializers
from django.utils import timezone
# import uuid
from .models import Notice, CommentReaction, EditNotice


class CreateNoticeSerializer(serializers.Serializer):
    
    title = serializers.CharField(max_length=100)
    text = serializers.CharField(max_length=250)
    photo_url =  serializers.CharField(max_length=50)
    video_url =  serializers.CharField(max_length=50)
    audio_url = serializers.CharField(max_length=50)
    published = serializers.BooleanField(default=False) 
    date_added = serializers.DateTimeField(default=timezone.now())
    last_modified = serializers.DateTimeField(default=timezone.now())
    # parent = serializers.CharField(max_length=100, primary_key=True)
    # parent = serializers.UUIDField(default=uuid.uuid1())
    

    def create(self, validated_data):
        return Notice(**validated_data)


class CommentReactionSerializer(serializers.Serializer):

    comment_id = serializers.IntegerField()
    reaction = serializers.CharField(max_length=5)

    def create(self, validated_data):
        return CommentReaction(**validated_data)

class EditNoticeSerializer(serializers.Serializer):

    notice_id = serializers.IntegerField()
    text = serializers.CharField(max_length=5)

    def create(self, validated_data):
        return EditNotice(**validated_data)
