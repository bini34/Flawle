from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(title="Flawel Api", default_version='v1'),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    # path('api/v1/products/', include('products.urls')),
    # path('api/v1/orders/', include('orders.urls')),
    # path('api/v1/payments/', include('payments.urls')),
    # path('api/v1/reports/', include('reports.urls')),
    # path('api/v1/notifications/', include('notifications.urls')),
    # path('api/v1/ai/', include('ai_assistant.urls')),

    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)