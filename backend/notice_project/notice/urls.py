from django.urls import path
from .views import (install, sidebar, create_room, CreateNewNotices, 
                     UpdateNoticeAPIView, DeleteNotice, search, get_room, 
                     ViewNoticeAPI, NoticeDetail,add_user, Unsubscribe, emailNotificaion,
                     sidebar_info, CreateNoticeView, add_member_to_room
                     )
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

    path('sidebar', sidebar_info, name="sidebar"), # changed sidebar to sidebar_info

    path('install', install, name='install'),
      
    path('sendemail', emailNotificaion, name="Email Notificaion"),

    path('unsubscribe', Unsubscribe.as_view()),

    path('create-room', create_room),

    path('organisation/<str:org_id>/create', CreateNewNotices.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>/edit', UpdateNoticeAPIView.as_view()),

    path('organisation/<str:org_id>/search', search.as_view()),

    path('get-room', get_room),
    
    path('add_user', add_user, name='add_user'),

    path('organisation/<str:org_id>/notices', ViewNoticeAPI.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>', NoticeDetail.as_view()),

    path('organisation/<str:org_id>/notices/<str:object_id>/delete', DeleteNotice.as_view()),

    # newly added due to sidebar task -- start
    path('create-notice', CreateNoticeView.as_view()),

    path('add-member', add_member_to_room), 
    # -- stop

    path('docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
