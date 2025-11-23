// presentation/providers/auth_provider.dart
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flawle/features/auth/domain/entities/user.dart';
import 'auth_usecases.dart';

part 'auth_provider.g.dart';

@Riverpod(keepAlive: true)
class AuthNotifier extends _$AuthNotifier {
  @override
  AuthState build() {
    // auto-initialize the current user on app start
    ref.read(getCurrentUserProvider).call().then((result) {
      result.fold((_) => null, (user) => state = AuthState.success(user));
    });
    return const AuthState.initial();
  }

  // ---------- SIGN IN ----------
  Future<void> signIn(String email, String password) async {
    state = const AuthState.signingIn();
    final result = await ref.read(signInProvider).call(email, password);
    state = result.fold(
      (error) => AuthState.errorSigningIn(error),
      (user) => AuthState.success(user),
    );
  }

  // ---------- SIGN UP ----------
  Future<void> signUp({
    required String firstName,
    required String lastName,
    String? phone,
    required String email,
    required String password,
  }) async {
    state = const AuthState.signingUp();
    final user = User(
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
    );
    final result = await ref.read(signUpProvider).call(user);
    state = result.fold(
      (error) => AuthState.errorSigningUp(error),
      (user) => AuthState.success(user),
    );
  }

  // ---------- SIGN OUT ----------
  Future<void> signOut() async {
    await ref.read(signOutProvider).call();
    state = const AuthState.initial();
  }

  // ---------- GET CURRENT USER ----------
  Future<User?> getCurrentUser({bool useLoading = false}) async {
    if (useLoading) state = const AuthState.gettingSignedInUser();
    final result = await ref.read(getCurrentUserProvider).call();
    return result.fold((_) => null, (user) {
      state = AuthState.success(user);
      return user;
    });
  }
}