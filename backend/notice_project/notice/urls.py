from django.urls import path
from .views import (install, sidebar, create_room, CreateNewNotices, 
                     UpdateNoticeAPIView, DeleteNotice, search, get_room, 
                     ViewNoticeAPI, NoticeDetail,add_user, Unsubscribe, emailNotificaion)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Noticeboard API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    path('sidebar', sidebar, name="sidebar"),

    path('install', install, name='install'),
      
    path('sendemail', emailNotificaion, name="Email Notificaion"),

    path('unsubscribe', Unsubscribe.as_view()),


    path('create-room', create_room),

    path('create', CreateNewNotices.as_view()),

    path('notices/<str:id>/edit', UpdateNoticeAPIView.as_view()),

    path('search', search.as_view()),

    path('get-room', get_room),
    
    path('add_user', add_user, name='add_user'),

    path('notices', ViewNoticeAPI.as_view()),

    path('notices/<str:id>', NoticeDetail.as_view()),

    path('notices/<str:object_id>/delete', DeleteNotice.as_view()),

    path('docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
