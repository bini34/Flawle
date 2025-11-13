import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/repo/auth_repo_impl.dart';
import 'package:flawle/features/auth/data/data-source/auth_data_source.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
part 'auth_repo.g.dart';

@Riverpod(keepAlive: true)
AuthRepo authRepo(Ref ref) {
  final dataSource = ref.read(authDataSourceProvider);
  return AuthRepoImpl(dataSource);
}

abstract class AuthRepo {
  Future<Either<String, User>> signInWithEmailAndPassword(
    String email,
    String password,
  );
  Future<Either<String, User>> signUp(User user);
  Future<Either<String, Unit>> signOut();
  Future<Either<String, User>> getSignedInUser();
}
