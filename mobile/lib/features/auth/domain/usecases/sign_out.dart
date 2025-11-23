// domain/usecases/sign_out.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';
class SignOut {
  final AuthRepo repo;
  const SignOut(this.repo);

  Future<Either<String, Unit>> call() => repo.signOut();
}