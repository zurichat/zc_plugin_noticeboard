from rest_framework import serializers
from .storage import db

class CreateNoticeSerializer(serializers.Serializer):
    title = serializers.CharField(max_length = 255)
    department = serializers.CharField(max_length = 255)
    message = serializers.CharField(max_length = 255)