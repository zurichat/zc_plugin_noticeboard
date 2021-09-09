from django.urls import path
from .views import sidebar

# add url routes here

urlpatterns = [
    path('sidebar', sidebar),
]