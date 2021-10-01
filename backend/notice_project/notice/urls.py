from django.urls import path
from .views import (install, create_room, CreateNewNotices, 
                     UpdateNoticeAPIView, DeleteNotice, get_room, 
                     ViewNoticeAPI, NoticeDetail,add_user, Unsubscribe, emailNotificaion, NoticeReminder,
                     sidebar_info 
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

    path('organisation/<str:org_id>/create-room', create_room),

    path('organisation/<str:org_id>/create', CreateNewNotices.as_view()),

    path('organisation/<str:org_id>/create-reminder', NoticeReminder.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>/edit', UpdateNoticeAPIView.as_view()),

    path('organisation/<str:org_id>/get-room', get_room),
    
    path('organisation/<str:org_id>/notices', ViewNoticeAPI.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>', NoticeDetail.as_view()),

    path('organisation/<str:org_id>/notices/<str:object_id>/delete', DeleteNotice.as_view()),

    path('docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

# newly added due to sidebar task -- start
    # path('add_user', add_user, name='add_user'),

    # path('create-notice', CreateNoticeView.as_view()),

    # path('noticeboard/<str:room_id>', room_noticeboard_list), 

    # path('create-roomview', create_room_view), 

    # path('add-member', add_member_to_room), 
    # -- stop