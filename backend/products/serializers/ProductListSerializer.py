from django.db.models import OuterRef
from rest_framework import serializers
from products.models import Product,Brand,Category, ProductVariant
from products.serializers import ProductImageSerializer, ProductVariantSerializer, ProductDetailSerializer



class BrandSummarySerializer(serializers.modelserializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug']


class CategorySummarySerializer(serializers.modelserializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']




class ProductListSerializer(serializers.modelserializer):
    brand = BrandSummarySerializer(read_only=True)
    category = CategorySummarySerializer(read_only=True)

    starting_price = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    in_stock = serializers.BoundField(read_only=True)
    primary_image = serializers.URLField(read_only=True, allow_null=True)
    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'brand', 'category', 'starting_price', 'in_stock', 'primary_image', 'status', 'published_at']

    

   
class ProductDetailSerializer(serializers.modelserializer):
    brand = BrandSummarySerializer(read_only=True)
    category = CategorySummarySerializer(read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    details = ProductDetailSerializer(many=True, read_only=True)
    in_stock = serializers.SerializerMethodField()


    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'short_description', 'description', 'brand', 'category', 'variants', 'images', 'details', 'in_stock', 'status', 'created_at', 'updated_at', 'published_at']
        def get_in_stock(self, obj):
            return any(
                variant.is_active and variant.stock_qty > 0 
                for variant in obj.variants.all()
            )