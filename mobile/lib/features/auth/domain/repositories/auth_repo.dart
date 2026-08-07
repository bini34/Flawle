import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/repo/auth_repo_impl.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/data/data-source/auth_local_data_source.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
part 'auth_repo.g.dart';

@Riverpod(keepAlive: true)
AuthRepo authRepo(Ref ref) {
  final dataSource = ref.read(authDataSourceProvider);
  final local = ref.read(authLocalDataSourceProvider);
  return AuthRepoImpl(dataSource, local);
}

abstract class AuthRepo {
  Future<Either<String, User>> signInWithEmailAndPassword(
    String email,
    String password,
  );
  Future<Either<String, User>> signUp(User user);
  Future<Either<String, Unit>> signOut();
  Future<Either<String, User>> getSignedInUser();
  Future<Either<String, User>> updateProfile(User user);

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
