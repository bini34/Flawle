// domain/usecases/update_profile.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class UpdateProfile {
  final AuthRepo repo;
  const UpdateProfile(this.repo);

  Future<Either<String, User>> call(User user) => repo.updateProfile(user);
}