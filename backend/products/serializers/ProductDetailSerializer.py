from rest_framework import serializers
from ..models.ProductDetail import ProductDetail 


class ProductDetailSerializer(serializers.modelserializer):

    class Meta:
        model = ProductDetail
        fields = [
            'id',
            'type',
            'content',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    def validate_content(self, value):
        value = value.strip()


        if not value:
            raise serializers.ValidationError("Content cannot be empty.")
        return value    