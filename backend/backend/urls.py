from django.contrib import admin
from django.urls import path,include
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib.auth import views as auth_views
from django.conf import settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('api-url/', include('rest_framework.urls')),
    path('token-auth/', obtain_jwt_token),
    path('social/', include('Authentication.urls'))
]