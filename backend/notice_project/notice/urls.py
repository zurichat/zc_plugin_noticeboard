from django.urls import path
from .views import DeleteNotice, install,sidebar, create_room, CreateNewNotices, search, get_room
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

   path('install',install, name='install'),

   path('create-notice-room', create_room),

   path('create-notice', CreateNewNotices.as_view()),

   path('search', search.as_view()),

   path('organizations/<str:org_id>/notices/<str:object_id>/delete-notice', DeleteNotice.as_view()),

   path('get-room', get_room),

   path('docs', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
