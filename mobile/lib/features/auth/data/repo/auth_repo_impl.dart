// features/auth/data/repositories/auth_repo_impl.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/data/model/userModel.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

class AuthRepoImpl implements AuthRepo {
  final AuthDataSource _dataSource;

  AuthRepoImpl(this._dataSource);

  @override
  Future<Either<String, User>> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    final result = await _dataSource.signInWithEmailAndPassword(
      email,
      password,
    );
    return result.map((model) => model.toDomain());
  }

  @override
  Future<Either<String, User>> signUp(User user) async {
    final userModel = user.toModel(); // ← requires extension (see below)
    final result = await _dataSource.signUp(userModel);
    return result.map((model) => model.toDomain());
  }

  @override
  Future<Either<String, Unit>> signOut() => _dataSource.signOut();

  @override
  Future<Either<String, User>> getSignedInUser() async {
    final result = await _dataSource.getSignedInUser();
    return result.map((model) => model.toDomain());
  }
}
