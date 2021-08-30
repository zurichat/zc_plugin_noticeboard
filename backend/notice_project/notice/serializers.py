from .models import NoticeBoard

# Create a serializer for Noticeboard CRUD API

class NoticeBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeBoard
        fields = ['id', 'title', 'owner', 'date']
