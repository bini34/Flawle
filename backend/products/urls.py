# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.views import ProductDetailViewSet, ProductImageViewSet, ProductVariantViewSet, ProductViewSet

router = DefaultRouter()
# router.register(r"brands", views.BrandViewSet, basename="brand")
# router.register(r"categories", views.CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
variant_create = ProductVariantViewSet.as_view({"post": "create",})
variant_update_delete = ProductVariantViewSet.as_view({"put": "update", "patch": "partial_update", "delete": "destroy",})
product_image_create = ProductImageViewSet.as_view({"post": "create",})
product_image_update_delete = ProductImageViewSet.as_view({"put": "update", "patch": "partial_update", "delete": "destroy",})
product_detail_create = ProductDetailViewSet.as_view({"post": "create",})
product_detail_update_delete = ProductDetailViewSet.as_view({"put": "update", "patch": "partial_update", "delete": "destroy",})


urlpatterns = router.urls + [
   path(
        "products/<uuid:product_pk>/variants/",
        variant_create,
        name="product-variant-create",
    ),

    path(
        "products/<uuid:product_pk>/variants/<uuid:pk>/",
        variant_update_delete,
        name="product-variant-update-delete",
    ),

    path(
        "products/<uuid:product_pk>/images/",
        product_image_create,
        name="product-image-create",
    ),

    path(
        "products/<uuid:product_pk>/images/<uuid:pk>/",
        product_image_update_delete,
        name="product-image-update-delete",
    ),
     path(
        "products/<uuid:product_pk>/details/",
        product_detail_create,
        name="product-detail-create",
    ),

    path(
        "products/<uuid:product_pk>/details/<uuid:pk>/",
        product_detail_update_delete,
        name="product-detail-update-delete",
    ),
]
urlpatterns = router.urls