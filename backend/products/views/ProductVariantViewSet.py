from rest_framework.viewsets import GenericViewSet, ModelViewSet

from products.models import ProductVariant
from products.permissions import IsAdminOrReadOnly
from products.serializers import ProductVariantSerializer
from django.shortcuts import get_object_or_404
from rest_framework import mixins

class ProductVariantViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, GenericViewSet):
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return ProductVariant.objects.filter(
            product_id=self.kwargs["product_pk"]
        )
    def perform_create(self, serializer):
        product = get_object_or_404(
            product,
            pk=self.kwargs["product_pk"]
        )
        serializer.save(
            product=product
        )