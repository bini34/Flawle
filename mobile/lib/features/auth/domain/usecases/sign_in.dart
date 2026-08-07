// domain/usecases/sign_in.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class SignIn {
  final AuthRepo repo;
  const SignIn(this.repo);

  Future<Either<String, User>> call(String email, String password) =>
      repo.signInWithEmailAndPassword(email, password);
}