// domain/usecases/get_current_user.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';
class GetCurrentUser {
  final AuthRepo repo;
  const GetCurrentUser(this.repo);

  Future<Either<String, User>> call() => repo.getSignedInUser();
}