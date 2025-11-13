// features/auth/data/data-source/auth_remote_data_source.dart
import 'dart:convert';
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/data/model/userModel.dart';
import 'package:http/http.dart' as http;

class AuthRemoteDataSource implements AuthDataSource {
  final http.Client client;
  AuthRemoteDataSource({http.Client? client})
    : client = client ?? http.Client();

  static const String baseUrl = 'https://your-api.com/api'; // ← your backend

  @override
  Future<Either<String, UserModel>> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        return Right(UserModel.fromJson(json['user']));
      } else {
        return Left(response.body);
      }
    } catch (e) {
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, UserModel>> signUp(UserModel userModel) async {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(userModel.toJson()),
      );

      if (response.statusCode == 201) {
        final json = jsonDecode(response.body);
        return Right(UserModel.fromJson(json['user']));
      } else {
        return Left(response.body);
      }
    } catch (e) {
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, Unit>> signOut() async {
    // your logout logic
    return const Right(unit);
  }

  @override
  Future<Either<String, UserModel>> getSignedInUser() async {
    return Left('Not implemented');
  }
}
