from rest_framework import serializers


class DictConverter(object):
    def __init__(self, reactions):
        self.reactions = reactions 


class ReactionSerializer(serializers.Serializer):
    reactions = serializers.DictField(
        child = serializers.CharField()
    )