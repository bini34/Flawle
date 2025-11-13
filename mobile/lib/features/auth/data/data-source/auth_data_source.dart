// features/auth/data/data-source/auth_data_source.dart
import 'package:dartz/dartz.dart';
import 'package:flawle/features/auth/data/data-source/auth_remote_data_source.dart';
import 'package:flawle/features/auth/data/model/userModel.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
part 'auth_data_source.g.dart';

@Riverpod(keepAlive: true)
AuthDataSource authDataSource(Ref ref) {
  // Example 1: Using Dio
  // final dio = ref.read(dioProvider);
  // return AuthRemoteDataSource(dio: dio);

  // Example 2: Using http package
  // return AuthRemoteDataSource(client: http.Client());

  // Example 3: Your custom implementation (most common)
  return AuthRemoteDataSource(); // ← your class, no params needed
}

abstract class AuthDataSource {
  Future<Either<String, UserModel>> signInWithEmailAndPassword(
    String email,
    String password,
  );

  Future<Either<String, UserModel>> signUp(UserModel userModel);

  Future<Either<String, Unit>> signOut();

  Future<Either<String, UserModel>> getSignedInUser();
}
