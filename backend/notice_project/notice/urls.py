from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from .views import (
    attach_file,
    bookmark_notice,
    create_bookmark,
    create_notice_view,
    delete_bookmarked_notice,
    delete_notice,
    notice_detail,
    notice_draft,
    NoticeReminder,
    schedule_notices,
    update_notice_view,
    view_notice,
    view_notice_reminder,
    view_schedule,
    create_room,
    email_notification,
    email_subscription,
    get_room,
    install,
    sidebar_info,
    add_user_to_room,
    remove_user_from_room,
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
    path("organisation/<str:org_id>/user/<str:user_id>/room", create_room),
    path("organisation/<str:org_id>/create", create_notice_view),
    path(
        "organisation/<str:org_id>/create-reminder",
        NoticeReminder.as_view(),
    ),
    path("organisation/<str:org_id>/view-reminder", view_notice_reminder),
    path("organisation/<str:org_id>/create_draft", notice_draft),
    path("organisation/<str:org_id>/create_schedule", schedule_notices),
    path("organisation/<str:org_id>/schedule", view_schedule),
    path("organisation/<str:org_id>/notices/<str:obj_id>/edit", update_notice_view),
    path("organisation/<str:org_id>/get-room", get_room),
    path(
        "organisation/<str:org_id>/room/<str_room_id>/members/<str:member_id>",
        add_user_to_room,
        name="add-user-to-room",
    ),
    path(
        "organisation/<str:org_id>/room/<str_room_id>/members/<str:member_id>",
        remove_user_from_room,
        name="remove-user-from-room",
    ),
    path("organisation/<str:org_id>/notices", view_notice),
    path(
        "organisation/<str:org_id>/notices/<str:obj_id>",
        notice_detail,
        name="notice-detail",
    ),
    path(
        "organisation/<str:org_id>/notices/<str:object_id>/delete",
        delete_notice,
        name="delete-notice",
    ),
    path(
        "organisation/<str:org_id>/user/<str:user_id>/bookmark",
        bookmark_notice,
        name="list-bookmark",
    ),
    path(
        "organisation/<str:org_id>/bookmark",
        create_bookmark,
        name="create-bookmark",
    ),
    path(
        "organisation/<str:org_id>/bookmark/<str:obj_id>/delete",
        delete_bookmarked_notice,
        name="delete-bookmark",
    ),
    path(
        "organisation/<str:org_id>/attachfile",
        attach_file,
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
