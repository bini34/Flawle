from rest_framework import serializers
from products.Models import Product, Brand, Category
from products.serializers.ProductListSerializer import BrandSummarySerializer, CategorySummarySerializer


class ProductWriteSerializer(serializers.ModelSerializer):
    brand = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'short_description', 'description', 'brand', 'category', 'status', 'published_at', 'created_at', 'updated_at']
        read_only_fields = ['id','slug','published_at','created_at', 'updated_at']

    def validate_title(self, value):
       value = value.strip()
       if not value:
           raise serializers.ValidationError("Product title cannot be empty.")
       return value
