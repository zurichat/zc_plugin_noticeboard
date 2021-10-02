from django.urls import path
from .views import (Subscribe, install, create_room, sidebar_info, CreateNewNotices, 
                     UpdateNoticeAPIView, DeleteNotice, get_room, AttachFile,
                     ViewNoticeAPI, NoticeDetail, Unsubscribe, NoticeReminder,ScheduleNotices,ViewSchedule,NoticeDraft, BookmarkNotice, CreateBookmark, DeleteBookmarkedNotice, ScheduleNoticeAPI, email_subscription, email_notification
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

    path('email-subscription', email_subscription),

    path('email-notification', email_notification),

    path('unsubscribe', Unsubscribe.as_view()),

    path('organisation/<str:org_id>/create-room', create_room),

    path('organisation/<str:org_id>/create', CreateNewNotices.as_view()),

    path('organisation/<str:org_id>/schedule', ScheduleNoticeAPI.as_view()),
    
    path('organisation/<str:org_id>/create-reminder', NoticeReminder.as_view()),

    path('organisation/<str:org_id>/create_draft', NoticeDraft.as_view()),

    path('organisation/<str:org_id>/create_schedule', ScheduleNotices.as_view()),

    path('organisation/<str:org_id>/schedules', ViewSchedule.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>/edit', UpdateNoticeAPIView.as_view()),

    path('organisation/<str:org_id>/get-room', get_room),
    
    path('organisation/<str:org_id>/notices', ViewNoticeAPI.as_view()),

    path('organisation/<str:org_id>/notices/<str:id>/<str:email>', NoticeDetail.as_view()),

    path('organisation/<str:org_id>/notices/<str:object_id>/delete', DeleteNotice.as_view()),

    path('organisation/<str:org_id>/user/<str:user_id>/bookmark', BookmarkNotice.as_view()),

    path('organisation/<str:org_id>/bookmark',CreateBookmark.as_view()),

    path('organisation/<str:org_id>/bookmark/<str:id>/delete',DeleteBookmarkedNotice.as_view()),

    path("organisation/<str:org_id>/attachfile", AttachFile.as_view(), name="media_files",),

    path('docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

# newly added due to sidebar task -- start
    # path('add_user', add_user, name='add_user'),

    # path('create-notice', CreateNoticeView.as_view()),

    # path('noticeboard/<str:room_id>', room_noticeboard_list), 

    # path('create-roomview', create_room_view), 

    # path('add-member', add_member_to_room), 
    # -- stop