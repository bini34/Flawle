# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.views import ProductViewSet

router = DefaultRouter()
# router.register(r"brands", views.BrandViewSet, basename="brand")
# router.register(r"categories", views.CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")

urlpatterns = router.urls