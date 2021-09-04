"""noticeboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include, re_path
=======
from django.urls import path, include
>>>>>>> f8a34e3fb11b6670a24b3b6648863578f4037f16
from django.views.generic import TemplateView

urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/', include('notice.urls')),
<<<<<<< HEAD
    # path('', TemplateView.as_view(template_name = "index.html")),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')), 
=======

    path('', TemplateView.as_view(template_name = "index.html")),
>>>>>>> f8a34e3fb11b6670a24b3b6648863578f4037f16
    
]
