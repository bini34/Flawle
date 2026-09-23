from django.core import serializers

from products.Models.ProductVariant import ProductVariant


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'product', 'sku', 'price', 'stock_qty','is_active', 'created_at', 'updated_at']
        read_only_fields = ['id','sku', 'created_at', 'updated_at']

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Variant name cannot be empty.")
        return value
    def validate_currency(self, value):
        value = value.strip().upper()
        if len(value) != 3:
            raise serializers.ValidationError("Currency must be a 3-letter code.")
        return value
