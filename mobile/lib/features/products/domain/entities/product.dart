import 'package:equatable/equatable.dart';

class Product extends Equatable {
  final String id;
  final String brand;
  final String title;
  final String shortDescription; // brief marketing line
  final String description; // long description
  final String ingredients; // comma-separated or formatted string
  final String? usage; // how to use instructions
  final List<String> imageUrls;
  final List<String> variants;
  final double price;
  final bool isFavorite;
  final bool limited;
  final int selectedVariantIndex;

  const Product({
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
    this.limited = false,
    this.selectedVariantIndex = 0,
  });

  @override
  List<Object?> get props => [
    id,
    brand,
    title,
    shortDescription,
    description,
    ingredients,
    usage,
    imageUrls,
    variants,
    price,
    isFavorite,
    limited,
    selectedVariantIndex,
  ];
}