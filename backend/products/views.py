# views.py
from rest_framework import viewsets, filters
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Brand, Category, Product
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    ProductSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("brand", "category")\
        .prefetch_related("variants", "images", "details")\
        .filter(status=Product.STATUS_ACTIVE)\
        .order_by("-created_at")

    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    lookup_field = "id"

    # Filters, Search, Ordering
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # Search in title, description
    search_fields = ["title", "short_description", "description", "sku"]

    # Allow sorting
    ordering_fields = ["price", "created_at", "published_at", "stock_qty"]
    ordering = ["-created_at"]  # default newest first

    # Powerful filtering
    filterset_fields = {
        "brand__id": ["exact"],
        "brand__slug": ["exact"],
        "category__id": ["exact"],
        "category__slug": ["exact"],
        "category__parent__slug": ["exact"],  # e.g., ?category__parent__slug=beauty
        "price": ["gte", "lte", "exact"],
        "stock_qty": ["gt", "gte"],
        "status": ["exact"],
    }


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by("name")
    serializer_class = BrandSerializer
    lookup_field = "id"

    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

    @action(detail=True, methods=["get"], url_path="products")
    def products(self, request, id=None):
        brand = self.get_object()
        products = Product.objects.filter(
            brand=brand,
            status=Product.STATUS_ACTIVE
        ).select_related("brand", "category").prefetch_related("variants", "images", "details")

        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)

        serializer = ProductSerializer(products, many=True, context={"request": request})
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"

    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

    @action(detail=True, methods=["get"], url_path="products")
    def products(self, request, id=None):
        category = self.get_object()
        products = Product.objects.filter(
            category=category,
            status=Product.STATUS_ACTIVE
        ).select_related("brand", "category").prefetch_related("variants", "images", "details")

        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)

        serializer = ProductSerializer(products, many=True, context={"request": request})
        return Response(serializer.data)