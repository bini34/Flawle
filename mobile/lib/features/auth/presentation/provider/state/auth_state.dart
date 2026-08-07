// presentation/providers/auth_state.dart
import '../../../domain/entities/user.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_state.freezed.dart';

@freezed
class AuthState with _$AuthState {
  const factory AuthState.initial() = _Initial;
  const factory AuthState.signingIn() = _SigningIn;
  const factory AuthState.signingUp() = _SigningUp;
  const factory AuthState.gettingSignedInUser() = _GettingSignedInUser;

  const factory AuthState.success(User user) = _Success;
  const factory AuthState.errorSigningUp(String message) = _Error;
  const factory AuthState.errorSigningIn(String message) = _ErrorSigningIn;
}
