import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class ResetPassword {
  final AuthRepo _repo;
  ResetPassword(this._repo);

  Future<Either<String, Unit>> call({
    required String email,
    required String code,
    required String newPassword,
    required String confirmPassword,
  }) async {
    if (email.isEmpty) return const Left('Email required');
    if (code.isEmpty) return const Left('Code required');
    if (newPassword.isEmpty || confirmPassword.isEmpty) {
      return const Left('Password required');
    }
    if (newPassword != confirmPassword) {
      return const Left('Passwords do not match');
    }
    if (newPassword.length < 6) {
      return const Left('Password too short');
    }
    return _repo.resetPassword(
      email: email,
      code: code,
      newPassword: newPassword,
    );
  }
}
