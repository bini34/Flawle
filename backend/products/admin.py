from django.contrib import admin
from .Models.ProductDetail import (
	Category,
	Product,
	ProductVariant,
	ProductImage,
	ProductDetail,
)


class ProductImageInline(admin.TabularInline):
	model = ProductImage
	extra = 1
	fields = ("image_url", "position")
	ordering = ("position",)


class ProductVariantInline(admin.TabularInline):
	model = ProductVariant
	extra = 1
	fields = ("name", "price", "stock_qty", "sku", "image_url")


class ProductDetailInline(admin.TabularInline):
	model = ProductDetail
	extra = 1
	fields = ("type", "content")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "parent", "slug", "created_at")
	list_filter = ("parent",)
	search_fields = ("name", "slug")
	prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
	list_display = (
		"title",
		"brand",
		"category",
		"price",
		"stock_qty",
		"status",
		"created_at",
		"updated_at",
	)
	list_filter = ("status", "category", "brand")
	search_fields = ("title", "brand", "slug")
	prepopulated_fields = {"slug": ("title",)}
	inlines = [ProductImageInline, ProductVariantInline, ProductDetailInline]
	autocomplete_fields = ("category",)

