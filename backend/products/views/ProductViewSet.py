from django.db.models import Q, Exists, OuterRef
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import ordering, SearchFilter
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.utils.pagination import CustomPagination
from products.Models import Product, ProductVariant
from products.filters import ProductFilter
from products.permissions import IsAdminOrReadOnly
from products.serializers import ProductListSerializer, ProductWriteSerializer, ProductDetailSerializer

class ProductViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, ordering.OrderingFilter]
    filterset_fields = ProductFilter
    search_fields = ['title', 'short_description', 'description']
    ordering_fields = ['title', 'published_at', 'created_at','starting_price']
    ordering = ['-created_at']

    def get_queryset(self):
        available_variants = ProductVariant.objects.filter(
        product=OuterRef("pk"),
        is_active=True,
        stock_qty__gt=0,
    )

        queryset = Product.objects.select_related('brand', 'category').prefetch_related('variants', 'images', 'details').annotate(starting_price=min("variants__price", filter=Q(variants__is_active=True), in_stock=Exists(available_variants)))
        if not self.request.user.is_staff:
            queryset = queryset.filter(status=Product.Status.ACTIVE )
        return queryset