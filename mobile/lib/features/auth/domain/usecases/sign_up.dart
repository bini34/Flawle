// domain/usecases/sign_up.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class SignUp {
  final AuthRepo repo;
  const SignUp(this.repo);

  Future<Either<String, User>> call(User user) => repo.signUp(user);
}
