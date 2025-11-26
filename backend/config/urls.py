from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from . import views

schema_view = get_schema_view(
    openapi.Info(title="Flawel Api", default_version='v1'),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=[SessionAuthentication, BasicAuthentication],
)

urlpatterns = [
    path("health/", views.HealthCheckView.as_view(), name="health_check"),
 # Health check endpoint
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/products/', include('products.urls')),
    # path('api/v1/orders/', include('orders.urls')),
    # path('api/v1/payments/', include('payments.urls')),
    # path('api/v1/reports/', include('reports.urls')),
    # path('api/v1/notifications/', include('notifications.urls')),
    # path('api/v1/ai/', include('ai_assistant.urls')),

    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)