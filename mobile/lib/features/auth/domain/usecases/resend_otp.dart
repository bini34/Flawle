import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class ResendOtp {
  final AuthRepo _repo;
  ResendOtp(this._repo);

  Future<Either<String, Unit>> call({String? email, String? phone}) async {
    if ((email == null || email.isEmpty) && (phone == null || phone.isEmpty)) {
      return const Left('Email or phone is required');
    }
    return _repo.resendOtp(email: email, phone: phone);
  }
}
