from django.urls import path
from .views import install,store_notice,sidebar

# add url routes here

urlpatterns = [
    path('sidebar', sidebar, name="sidebar"),

    path('install',install, name='install'),

    path('save',store_notice, name='store_notice'),

]