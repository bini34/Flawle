from django.shortcuts import get_object_or_404

from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from products.models import Product, ProductImage
from products.permissions import IsAdminOrReadOnly
from products.serializers import ProductImageSerializer



class ProductImageViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return ProductImage.objects.filter(
            product_id=self.kwargs["product_pk"]
        )

    def perform_create(self, serializer):
        product = get_object_or_404(
            Product,
            pk=self.kwargs["product_pk"],
        )

        serializer.save(
            product=product
        )