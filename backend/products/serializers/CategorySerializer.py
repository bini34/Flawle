from django.core import serializers
from products.models.Category import Category


class CategorySerializer(serializers.modelserializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Category name cannot be empty.")
        return value    
    def validate_parent(self, value):
        if value and not Category.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("A category cannot be itself as a parent.")
        return value