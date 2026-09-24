from django.core import serializers

from products.models import ProductImage


class ProductImageSerializer(serializers.modelserializer):
    class Meta:
        model = ProductImage
        fields = ['id',  'image_url', 'public_id','alt_text','position', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_image_url(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Image URL cannot be empty.")
        return value
    def validate_alt_text(self, value):
        return value.strip()