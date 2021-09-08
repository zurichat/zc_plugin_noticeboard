from rest_framework import serializers
from django.utils import timezone
# import uuid
<<<<<<< HEAD
from .models import Notice, CommentReaction, EditNotice, CommentCreate
# from .models import Notice, CommentReaction, CommentCreate


class CreateNoticeSerializer(serializers.Serializer):

=======
from .models import Notice, CommentReaction, EditNotice, CommentCreate, CreateReaction


class CreateNoticeSerializer(serializers.Serializer):
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8
    title = serializers.CharField(max_length=100)
    text = serializers.CharField(max_length=250)
    photo_url = serializers.CharField(max_length=50)
    video_url = serializers.CharField(max_length=50)
    audio_url = serializers.CharField(max_length=50)
    published = serializers.BooleanField(default=False)
    date_added = serializers.DateTimeField(default=timezone.now())
    last_modified = serializers.DateTimeField(default=timezone.now())
    viewed_by = serializers.CharField(max_length=5000, allow_blank=True)

    # parent = serializers.CharField(max_length=100, primary_key=True)
    # parent = serializers.UUIDField(default=uuid.uuid1())

    def create(self, validated_data):
        return Notice(**validated_data)


class CommentReactionSerializer(serializers.Serializer):
    comment_id = serializers.IntegerField()
    reaction = serializers.CharField(max_length=5)

    def create(self, validated_data):
        return CommentReaction(**validated_data)

<<<<<<< HEAD

class EditNoticeSerializer(serializers.Serializer):
=======
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8

class EditNoticeSerializer(serializers.Serializer):
    notice_id = serializers.IntegerField()
    text = serializers.CharField(max_length=5)

    def create(self, validated_data):
        return EditNotice(**validated_data)


class CommentCreateSerializer(serializers.Serializer):
<<<<<<< HEAD
    """Your data serializer, define your fields here."""
=======
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8
    comment = serializers.CharField(max_length=500)
    date_added = serializers.DateTimeField(default=timezone.now())

    def create(self, validated_data):
        return CommentCreate(**validated_data)
<<<<<<< HEAD
=======


class CreateReactionSerializer(serializers.Serializer):
    comment_id = serializers.IntegerField()
    reaction = serializers.CharField(max_length=400)

    def create(self, validated_data):
        return CreateReaction(**validated_data)
>>>>>>> 530d5ae53197882ed1b1630241134b9c8accfde8
