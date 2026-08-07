// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProductModel _$ProductModelFromJson(Map<String, dynamic> json) => ProductModel(
  id: json['id'] as String,
  brand: json['brand'] as String,
  title: json['title'] as String,
  shortDescription: json['short_description'] as String,
  description: json['description'] as String,
  ingredients: json['ingredients'] as String,
  usage: json['usage'] as String?,
  imageUrls:
      (json['image_urls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      [],
  variants:
      (json['variants'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      [],
  price: (json['price'] as num).toDouble(),
  isFavorite: json['is_favorite'] as bool? ?? false,
  selectedVariantIndex: (json['selected_variant_index'] as num?)?.toInt() ?? 0,
);

Map<String, dynamic> _$ProductModelToJson(ProductModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'brand': instance.brand,
      'title': instance.title,
      'short_description': instance.shortDescription,
      'description': instance.description,
      'ingredients': instance.ingredients,
      'usage': instance.usage,
      'image_urls': instance.imageUrls,
      'variants': instance.variants,
      'price': instance.price,
      'is_favorite': instance.isFavorite,
      'selected_variant_index': instance.selectedVariantIndex,
    };
