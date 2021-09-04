from django.db import models

class Notice:
    def __init__(self, title,
                text,photo_url, video_url, audio_url,published,
                date_added,last_modified,
                
                 ):
        
      
        self.title = title
        self.text = text
        self.photo_url = photo_url
        self.video_url =  video_url
        self.audio_url = audio_url
        self.published =  published
        self.date_added = date_added
        self.last_modified = last_modified
        # self.parent = parent

class CommentReaction:
    def __init__(self, comment_id, reaction):
        self.comment_id = comment_id
        self.reaction = reaction

class EditNotice:
    def __init__(self, notice_id, text):
        self.notice_id = notice_id
        self.text = text

class CommentCreate:

    def __init__(self, comment, date_added):
        self.comment = comment
        self.date_added = date_added



class CreateReaction:
    def __init__(self, comment_id, reaction):
        self.comment_id = comment_id
        self.reaction = reaction
