from django.core import serializers

from products.models.Brand import Brand


class BrandSerializer(serializers.modelserializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'description', 'logo_url', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Brand name cannot be empty.")   
        return value