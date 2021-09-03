from .models import NoticeReaction
from rest_framework import serializers

class ReactionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = NoticeReaction
        fields = ['id', 'user', 'noticeid', 'reaction_content']
    
