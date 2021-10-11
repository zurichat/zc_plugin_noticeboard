from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from .views import (
    AttachFile,
    BookmarkNotice,
    CreateBookmark,
    CreateNewNotices,
    DeleteBookmarkedNotice,
    DeleteNotice,
    NoticeDetail,
    NoticeDraft,
    NoticeReminder,
    ScheduleNotices,
    Subscribe,
    Unsubscribe,
    UpdateNoticeAPIView,
    ViewNoticeAPI,
    ViewNoticeReminder,
    ViewSchedule,
    create_room,
    email_notification,
    email_subscription,
    emailNotificaion,
    get_room,
    install,
    sidebar_info,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Noticeboard API",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("sidebar", sidebar_info, name="sidebar"),  # changed sidebar to sidebar_info
    path("install", install, name="install"),
    path("sendemail", emailNotificaion, name="Email Notificaion"),
    path("subscribe", Subscribe.as_view()),
    path("unsubscribe", Unsubscribe.as_view()),
    path("organisation/<str:org_id>/create-room", create_room),
    path("organisation/<str:org_id>/create", CreateNewNotices.as_view()),
    path(
        "organisation/<str:org_id>/create-reminder/<str:notice_id>",
        NoticeReminder.as_view(),
    ),
    path("organisation/<str:org_id>/view-reminder", ViewNoticeReminder.as_view()),
    path("organisation/<str:org_id>/create_draft", NoticeDraft.as_view()),
    path("organisation/<str:org_id>/create_schedule", ScheduleNotices.as_view()),
    path("organisation/<str:org_id>/schedule", ViewSchedule.as_view()),
    path(
        "organisation/<str:org_id>/notices/<str:id>/edit", UpdateNoticeAPIView.as_view()
    ),
    path("organisation/<str:org_id>/get-room", get_room),
    path("organisation/<str:org_id>/notices", ViewNoticeAPI.as_view()),
    path(
        "organisation/<str:org_id>/notices/<str:id>",
        NoticeDetail.as_view(),
        name="notice-detail",
    ),
    path(
        "organisation/<str:org_id>/notices/<str:object_id>/delete",
        DeleteNotice.as_view(),
        name="delete-notice",
    ),
    path(
        "organisation/<str:org_id>/user/<str:user_id>/bookmark",
        BookmarkNotice.as_view(),
        name="list-bookmark",
    ),
    path(
        "organisation/<str:org_id>/bookmark",
        CreateBookmark.as_view(),
        name="create-bookmark",
    ),
    path(
        "organisation/<str:org_id>/bookmark/<str:id>/delete",
        DeleteBookmarkedNotice.as_view(),
        name="delete-bookmark",
    ),
    path(
        "organisation/<str:org_id>/attachfile",
        AttachFile.as_view(),
        name="media_files",
    ),
    path("organisation/email-notification", email_notification),
    path("organisation/email-subscription", email_subscription),
    path(
        "docs",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]

# newly added due to sidebar task -- start
# path('add_user', add_user, name='add_user'),

# path('create-notice', CreateNoticeView.as_view()),

# path('noticeboard/<str:room_id>', room_noticeboard_list),

# path('create-roomview', create_room_view),

# path('add-member', add_member_to_room),
# -- stop
