from django.db import models

# Create your models here.

# Create the name of a todolist
class ToDoList(models.Model):
  name = models.CharField(max_length=100)
  
  def __str__(self):
    return self.name
  

# Create the item of a todolist  
class Item(models.Model):
  todolist = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
  text = models.CharField(max_length=300)
  complete = models.BooleanField()
  date = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.text








