@api_view(["POST"])
def store_notice(request):
    serializer = CreateNoteV2Serializer(data=request.data)
    
    if serializer.is_valid():
        response = Database.save("Test_notice", notice_data=serializer.data)
        if response and response.get("status_code") == 201:
            return Response(
                data=response, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateNoticeV2Serializer(serializers.Serializer):
    creator=serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=100)
    # text = serializers.CharField(max_length=250)
    # photo_url = serializers.CharField(max_length=50)
    # video_url = serializers.CharField(max_length=50)
    # audio_url = serializers.CharField(max_length=50)
    # published = serializers.BooleanField(default=False)
    # date_added = serializers.DateTimeField(default=timezone.now())
    # last_modified = serializers.DateTimeField(default=timezone.now())
    # viewed_by = serializers.CharField(max_length=5000, allow_blank=True)

    def __str__(self):
        return f"{self.title}-{self.creator}"

