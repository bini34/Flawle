// features/auth/data/data-source/auth_data_source.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/data-source/auth_remote_data_source.dart';
import 'package:flawle/features/auth/data/model/user_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
part 'auth_data_source.g.dart';

@Riverpod(keepAlive: true)
AuthDataSource authDataSource(Ref ref) {
  // Example 1: Using Dio
  // final dio = ref.read(dioProvider);
  // return AuthRemoteDataSource(dio: dio);

  // Example 2: Using http package
  // return AuthRemoteDataSource(client: http.Client());

  // Example 3: Your custom implementation (most common)
  return AuthRemoteDataSource(); // ← your class, no params needed
}

abstract class AuthDataSource {
  Future<Either<String, UserModel>> signInWithEmailAndPassword(
    String email,
    String password,
  );

  Future<Either<String, UserModel>> signUp(UserModel userModel);

  Future<Either<String, Unit>> signOut();

  Future<Either<String, UserModel>> getSignedInUser();

  Future<Either<String, UserModel>> updateUser(UserModel userModel);

  // OTP verification APIs
  Future<Either<String, Unit>> verifyOtp({
    String? email,
    String? phone,
    required String code,
  });

  Future<Either<String, Unit>> resendOtp({String? email, String? phone});

  // ---------- Password Reset Flow ----------
  Future<Either<String, Unit>> requestPasswordReset(String email);
  Future<Either<String, Unit>> verifyPasswordResetOtp({
    required String email,
    required String code,
  });
  Future<Either<String, Unit>> resetPassword({
    required String email,
    required String code,
    required String newPassword,
  });
}
