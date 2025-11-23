import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class VerifyOtp {
  final AuthRepo _repo;
  VerifyOtp(this._repo);

  Future<Either<String, Unit>> call({
    String? email,
    String? phone,
    required String code,
  }) async {
    if ((email == null || email.isEmpty) && (phone == null || phone.isEmpty)) {
      return const Left('Email or phone is required');
    }
    return _repo.verifyOtp(email: email, phone: phone, code: code);
  }
}
