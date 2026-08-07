import 'package:json_annotation/json_annotation.dart';
import '../../domain/entities/product.dart';

part 'product_model.g.dart';

@JsonSerializable(explicitToJson: true)
class ProductModel {
	@JsonKey(name: 'id')
	final String id;

	@JsonKey(name: 'brand')
	final String brand;

	@JsonKey(name: 'title')
	final String title;

	@JsonKey(name: 'short_description')
	final String shortDescription;

	@JsonKey(name: 'description')
	final String description;

	@JsonKey(name: 'ingredients')
	final String ingredients;

	@JsonKey(name: 'usage')
	final String? usage;

	@JsonKey(name: 'image_urls', defaultValue: <String> [])
	final List<String> imageUrls;

	@JsonKey(name: 'variants', defaultValue: <String> [])
	final List<String> variants;

	@JsonKey(name: 'price')
	final double price;

	@JsonKey(name: 'is_favorite', defaultValue: false)
	final bool isFavorite;

	@JsonKey(name: 'selected_variant_index', defaultValue: 0)
	final int selectedVariantIndex;

	const ProductModel({
		required this.id,
		required this.brand,
		required this.title,
		required this.shortDescription,
		required this.description,
		required this.ingredients,
		required this.usage,
		required this.imageUrls,
		required this.variants,
		required this.price,
		required this.isFavorite,
		this.selectedVariantIndex = 0,
	});

	// JSON
	factory ProductModel.fromJson(Map<String, dynamic> json) => _$ProductModelFromJson(json);
	Map<String, dynamic> toJson() => _$ProductModelToJson(this);

	// To domain entity
	Product toDomain() => Product(
				id: id,
				brand: brand,
				title: title,
				shortDescription: shortDescription,
				description: description,
				ingredients: ingredients,
				usage: usage,
				imageUrls: imageUrls,
				variants: variants,
				price: price,
				isFavorite: isFavorite,
				selectedVariantIndex: selectedVariantIndex,
			);

	// From entity
	ProductModel copyFromEntity(Product product) => ProductModel(
				id: product.id,
				brand: product.brand,
				title: product.title,
				shortDescription: product.shortDescription,
				description: product.description,
				ingredients: product.ingredients,
				usage: product.usage,
				imageUrls: product.imageUrls,
				variants: product.variants,
				price: product.price,
				isFavorite: product.isFavorite,
				selectedVariantIndex: product.selectedVariantIndex,
			);

	// copyWith
	ProductModel copyWith({
		String? id,
		String? brand,
		String? title,
		String? shortDescription,
		String? description,
		String? ingredients,
		String? usage,
		List<String>? imageUrls,
		List<String>? variants,
		double? price,
		bool? isFavorite,
		int? selectedVariantIndex,
	}) {
		return ProductModel(
			id: id ?? this.id,
			brand: brand ?? this.brand,
			title: title ?? this.title,
			shortDescription: shortDescription ?? this.shortDescription,
			description: description ?? this.description,
			ingredients: ingredients ?? this.ingredients,
			usage: usage ?? this.usage,
			imageUrls: imageUrls ?? this.imageUrls,
			variants: variants ?? this.variants,
			price: price ?? this.price,
			isFavorite: isFavorite ?? this.isFavorite,
			selectedVariantIndex: selectedVariantIndex ?? this.selectedVariantIndex,
		);
	}
}

// Extension mapping entity -> model
extension ProductEntityX on Product {
	ProductModel toModel() => ProductModel(
				id: id,
				brand: brand,
				title: title,
				shortDescription: shortDescription,
				description: description,
				ingredients: ingredients,
				usage: usage,
				imageUrls: imageUrls,
				variants: variants,
				price: price,
				isFavorite: isFavorite,
				selectedVariantIndex: selectedVariantIndex,
			);
}
