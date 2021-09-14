from rest_framework import serializers
from .storage import db


class CreateNotice(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    body = serializers.CharField(max_length=200)
