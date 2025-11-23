// features/auth/data/repositories/auth_repo_impl.dart
import 'dart:developer';

import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/data/model/userModel.dart';
import 'package:flawle/features/auth/data/data-source/auth_local_data_source.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class AuthRepoImpl implements AuthRepo {
  final AuthDataSource _dataSource;
  final AuthLocalDataSource _local;

  AuthRepoImpl(this._dataSource, this._local);

  @override
  Future<Either<String, User>> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    log('Signing in user with email: $email');
    final result = await _dataSource.signInWithEmailAndPassword(
      email,
      password,
    );
    return await result.fold((l) async => Left(l), (model) async {
      // persist locally
      await _local.saveUser(model);
      return Right(model.toDomain());
    });
  }

  @override
  Future<Either<String, User>> signUp(User user) async {
    print('Signing up user: $user');
    final userModel = user.toModel(); // ← requires extension (see below)
    final result = await _dataSource.signUp(userModel);
    return result.map((model) => model.toDomain());
  }

  @override
  Future<Either<String, Unit>> signOut() async {
    final res = await _dataSource.signOut();
    await _local.clearUser();
    return res;
  }

  @override
  Future<Either<String, User>> getSignedInUser() async {
    // Prefer local cached user for quick startup
    final cached = await _local.getUser();
    if (cached != null) {
      return Right(cached.toDomain());
    }
    final result = await _dataSource.getSignedInUser();
    // If received from remote, cache it
    return await result.fold((l) async => Left(l), (model) async {
      await _local.saveUser(model);
      return Right(model.toDomain());
    });
  }

  @override
  Future<Either<String, User>> updateProfile(User user) async {
    final model = user.toModel();
    final result = await _dataSource.updateUser(model);
    return await result.fold((l) async => Left(l), (m) async {
      await _local.saveUser(m);
      return Right(m.toDomain());
    });
  }

  @override
  Future<Either<String, Unit>> verifyOtp({
    String? email,
    String? phone,
    required String code,
  }) {
    return _dataSource.verifyOtp(email: email, phone: phone, code: code);
  }

  @override
  Future<Either<String, Unit>> resendOtp({String? email, String? phone}) {
    return _dataSource.resendOtp(email: email, phone: phone);
  }

  // ---------- Password Reset Flow ----------
  @override
  Future<Either<String, Unit>> requestPasswordReset(String email) {
    return _dataSource.requestPasswordReset(email);
  }

  @override
  Future<Either<String, Unit>> verifyPasswordResetOtp({
    required String email,
    required String code,
  }) {
    return _dataSource.verifyPasswordResetOtp(email: email, code: code);
  }

  @override
  Future<Either<String, Unit>> resetPassword({
    required String email,
    required String code,
    required String newPassword,
  }) {
    return _dataSource.resetPassword(
      email: email,
      code: code,
      newPassword: newPassword,
    );
  }
}
