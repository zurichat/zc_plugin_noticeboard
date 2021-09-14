from rest_framework import serializers
from .storage import db

class CreateNoticeSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 255)
    title = serializers.CharField(max_length = 255)
    organization_id = serializers.CharField(max_length = 255)
    announcement = serializers.CharField(max_length = 255)