import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class VerifyPasswordResetOtp {
  final AuthRepo _repo;
  VerifyPasswordResetOtp(this._repo);

  Future<Either<String, Unit>> call({
    required String email,
    required String code,
  }) async {
    if (email.isEmpty) return const Left('Email required');
    if (code.isEmpty) return const Left('Code required');
    return _repo.verifyPasswordResetOtp(email: email, code: code);
  }
}
