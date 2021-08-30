from django.db import models

# Create your models here.
class Event(models.Model):
  Priority_Choices = [
        (Very_Urgent, 'Very Urgent'),
        (Urgent, 'Urgent'),
        (Fairly_urgent, 'Fairly Urgent'),
        (Regular, 'Regular'),
        ]
	event_name = models.CharField(max_length = 75)
  event_type = models.CharField(max_length = 75)
  event_priority = models.Charfield(max length =80,choices = priority_choices,default = "Regular")
	event_description = models.CharField(max_length = 500)
	event_date = models.DateField()
  event_timings = models.TimeField()
	event_venue = models.CharField(max_length = 75)
	event_organizer_details = models.CharField(max_length= 140)

	def __str__(self):
		return self.event_name + "; " + self.event_venue + "; " + str(self.event_date)

	
	
# Create the model for NoticeBoard CRUD API endpoints



# Create your models here.

class NoticeBoard(models.Model):
    title = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
	
	
	
