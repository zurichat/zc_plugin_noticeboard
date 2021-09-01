from django.db import models
from django.contrib.auth.models import User



#this is just to have a data to work with in the database
#the notice id is the id associated to a particular notice
class NoticeReaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    noticeid = models.IntegerField()
    reaction_content = models.TextField()
