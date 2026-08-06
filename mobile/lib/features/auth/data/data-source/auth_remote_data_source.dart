// features/auth/data/data-source/auth_remote_data_source.dart
import 'dart:developer';

import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:flawle/core/network/dio_client.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/data/model/user_model.dart';

class AuthRemoteDataSource implements AuthDataSource {
  final Dio _dio;
  final DioClient _client;

  AuthRemoteDataSource({DioClient? client})
    : _client = client ?? DioClient(),
      _dio = (client ?? DioClient()).dio;

  String get _usersBase => '${_dio.options.baseUrl}/users';

  @override
  Future<Either<String, UserModel>> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      log('url: ${_dio.options.baseUrl}');
      final res = await _dio.post(
        '$_usersBase/login/',
        data: {'email': email, 'password': password},
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (code) => code != null && code < 500,
        ),
      );

      log('Signing in user with status: $res');

      if (res.statusCode == 200) {
        final data = res.data is Map<String, dynamic>
            ? res.data as Map<String, dynamic>
            : <String, dynamic>{};
        final userMap = (data['user'] as Map<String, dynamic>?) ?? data;

        // Optional: read tokens from cookies if backend sets them.
        await _client.getUserFromResponse();

        return Right(UserModel.fromJson(userMap));
      }

      return Left(res.data?.toString() ?? 'Login failed ($res)');
    } catch (e, st) {
      log('signIn error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, UserModel>> signUp(UserModel userModel) async {
    try {
      log('Signing up user with data: ${userModel.toCreateJson()}');
      final res = await _dio.post(
        '$_usersBase/register/',
        data: userModel.toCreateJson(),
        options: Options(headers: {'Content-Type': 'application/json'}),
      );
      log('Signing up user with status: ${res.statusCode}');
      log('Signing up user with data: $res');
      if (res.statusCode == 201 || res.statusCode == 200) {
        final data = res.data is Map<String, dynamic>
            ? res.data as Map<String, dynamic>
            : <String, dynamic>{};
        final userMap = (data['user'] as Map<String, dynamic>?) ?? data;
        return Right(UserModel.fromJson(userMap));
      }
      return Left(
        res.data?.toString() ?? 'Registration failed (${res.statusCode})',
      );
    } on DioException catch (e) {
      if (e.response?.statusCode == 400) {
        log("Validation Error: ${e.response?.data}");
      }
      rethrow;
    } catch (e, st) {
      log('signUp error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, Unit>> signOut() async {
    // Implement sign-out if your backend supports it.
    return const Right(unit);
  }

  @override
  Future<Either<String, UserModel>> getSignedInUser() async {
    try {
      final res = await _dio.get(
        '$_usersBase/me/',
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (code) => code != null && code < 500,
        ),
      );

      if (res.statusCode == 200) {
        final data = res.data is Map<String, dynamic>
            ? res.data as Map<String, dynamic>
            : <String, dynamic>{};
        final userMap = (data['user'] as Map<String, dynamic>?) ?? data;
        return Right(UserModel.fromJson(userMap));
      }
      if (res.statusCode == 401 || res.statusCode == 403) {
        return const Left('Unauthorized');
      }
      return Left(res.data?.toString() ?? 'Failed to fetch current user');
    } catch (e, st) {
      log('getSignedInUser error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, UserModel>> updateUser(UserModel userModel) async {
    return Left('Not implemented');
  }

  @override
  Future<Either<String, Unit>> verifyOtp({
    String? email,
    String? phone,
    required String code,
  }) async {
    try {
      final data = <String, dynamic>{'code': code};
      if (email != null && email.isNotEmpty) data['email'] = email;
      if (phone != null && phone.isNotEmpty) data['phone'] = phone;

      final res = await _dio.post(
        '$_usersBase/verify-otp/',
        data: data,
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (code) => code != null && code < 500,
        ),
      );

      if (res.statusCode == 200 || res.statusCode == 204) {
        return const Right(unit);
      }
      return Left(res.data?.toString() ?? 'OTP verification failed');
    } catch (e, st) {
      log('verifyOtp error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, Unit>> resendOtp({String? email, String? phone}) async {
    try {
      final data = <String, dynamic>{};
      if (email != null && email.isNotEmpty) data['email'] = email;
      if (phone != null && phone.isNotEmpty) data['phone'] = phone;

      final res = await _dio.post(
        '$_usersBase/resend-otp/',
        data: data.isEmpty ? null : data,
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (code) => code != null && code < 500,
        ),
      );

      if (res.statusCode == 200 || res.statusCode == 204) {
        return const Right(unit);
      }
      return Left(res.data?.toString() ?? 'Failed to resend code');
    } catch (e, st) {
      log('resendOtp error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  // ---------- Password Reset Flow ----------
  @override
  Future<Either<String, Unit>> requestPasswordReset(String email) async {
    try {
      final res = await _dio.post(
        '$_usersBase/forgot-password/',
        data: {'email': email},
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (c) => c != null && c < 500,
        ),
      );
      if (res.statusCode == 200 || res.statusCode == 204) {
        return const Right(unit);
      }
      return Left(res.data?.toString() ?? 'Failed to start password reset');
    } catch (e, st) {
      log('requestPasswordReset error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, Unit>> verifyPasswordResetOtp({
    required String email,
    required String code,
  }) async {
    try {
      final res = await _dio.post(
        '$_usersBase/forgot-password/verify-otp/',
        data: {'email': email, 'code': code},
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (c) => c != null && c < 500,
        ),
      );
      if (res.statusCode == 200 || res.statusCode == 204) {
        return const Right(unit);
      }
      return Left(res.data?.toString() ?? 'Invalid reset code');
    } catch (e, st) {
      log('verifyPasswordResetOtp error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }

  @override
  Future<Either<String, Unit>> resetPassword({
    required String email,
    required String code,
    required String newPassword,
  }) async {
    try {
      final res = await _dio.post(
        '$_usersBase/forgot-password/reset/',
        data: {'email': email, 'code': code, 'password': newPassword},
        options: Options(
          headers: {'Content-Type': 'application/json'},
          followRedirects: false,
          validateStatus: (c) => c != null && c < 500,
        ),
      );
      if (res.statusCode == 200 || res.statusCode == 204) {
        return const Right(unit);
      }
      return Left(res.data?.toString() ?? 'Failed to reset password');
    } catch (e, st) {
      log('resetPassword error: $e', stackTrace: st);
      return Left(e.toString());
    }
  }
}
