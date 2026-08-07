import uuid

from rest_framework import serializers
from .models import Brand, Category, Product, ProductDetail, ProductImage, ProductVariant


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("id", "name", "slug", "created_at", "updated_at")
        read_only_fields = ("slug", "created_at", "updated_at")


class BrandSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("id", "name", "slug")


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "parent", "created_at", "updated_at")
        read_only_fields = ("slug", "created_at", "updated_at")


class CategorySummarySerializer(serializers.ModelSerializer):
    parent = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "parent")


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ("id", "name", "price", "stock_qty", "sku")


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ("id", "type", "content")


# FIXED & UPGRADED: Now works with ImageField
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=False)           # Accept uploaded file via JSON payloads
    image_url = serializers.SerializerMethodField(read_only=True)            # Return full URL for responses

    class Meta:
        model = ProductImage
        fields = ("id", "image", "image_url", "position")
        read_only_fields = ("id",)

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


# MAIN PRODUCT SERIALIZER — FULLY UPDATED
class ProductSerializer(serializers.ModelSerializer):
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(), source="brand", allow_null=True, required=False
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", required=True
    )

    images = ProductImageSerializer(many=True, read_only=True)
    image_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
        allow_empty=True,
        help_text="Upload one or multiple product images via multipart/form-data.",
    )
    details = ProductDetailSerializer(many=True, required=False)
    variants = ProductVariantSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "slug",
            "sku",
            "brand_id",
            "category_id",
            "short_description",
            "description",
            "price",
            "currency",
            "stock_qty",
            "status",
            "published_at",
            "details",
            "variants",
            "images",
            "image_files",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("slug", "sku", "status", "published_at", "created_at", "updated_at")

    def create(self, validated_data):
        image_files = validated_data.pop("image_files", [])
        images_data = validated_data.pop("images", [])
        details_data = validated_data.pop("details", [])
        variants_data = validated_data.pop("variants", [])

        # Auto-generate SKU if not provided
        if "sku" not in validated_data or not validated_data["sku"]:
            validated_data["sku"] = f"PROD-{uuid.uuid4().hex[:12].upper()}"

        product = Product.objects.create(**validated_data)

        for position, uploaded in enumerate(image_files):
            ProductImage.objects.create(product=product, image=uploaded, position=position)
        for img in images_data:
            ProductImage.objects.create(product=product, **img)
        for detail in details_data:
            ProductDetail.objects.create(product=product, **detail)
        for variant in variants_data:
            if not variant.get("sku"):
                variant["sku"] = f"{product.sku}-{variant['name'][:3].upper()}"
            ProductVariant.objects.create(product=product, **variant)

        return product

    def update(self, instance, validated_data):
        image_files = validated_data.pop("image_files", None)
        images_data = validated_data.pop("images", None)
        details_data = validated_data.pop("details", None)
        variants_data = validated_data.pop("variants", None)

        # Update main fields (supports partial update!)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if image_files is not None:
            instance.images.all().delete()
            for position, uploaded in enumerate(image_files):
                ProductImage.objects.create(product=instance, image=uploaded, position=position)
        elif images_data is not None:
            instance.images.all().delete()
            for img in images_data:
                ProductImage.objects.create(product=instance, **img)

        if details_data is not None:
            instance.details.all().delete()
            for d in details_data:
                ProductDetail.objects.create(product=instance, **d)

        if variants_data is not None:
            instance.variants.all().delete()
            for v in variants_data:
                if not v.get("sku"):
                    v["sku"] = f"{instance.sku}-{v['name'][:3].upper()}"
                ProductVariant.objects.create(product=instance, **v)

        return instance