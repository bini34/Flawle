import 'package:dartz/dartz.dart';
import 'package:flawle/features/products/domain/entities/product.dart';
abstract class ProductRepo {
  Future<Either<String, Product>> fetchProducts();
  Future<Either<String, Product>> fetchProductById(String id);
  Future<Either<String, Product>> fetchProductByBrandId(String id);
  Future<Either<String, Product>> fetchProductByCategoryId(String id);
  Future<Either<String, Product>> searchProductByName(String productName);
  // Define product-related methods here
}