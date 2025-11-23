import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class RequestPasswordReset {
  final AuthRepo _repo;
  RequestPasswordReset(this._repo);

  Future<Either<String, Unit>> call(String email) async {
    if (email.isEmpty) return const Left('Email required');
    return _repo.requestPasswordReset(email);
  }
}
