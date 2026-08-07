// presentation/providers/auth_usecases.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flawle/features/auth/domain/usecases/sign_in.dart';
import 'package:flawle/features/auth/domain/usecases/sign_up.dart';
import 'package:flawle/features/auth/domain/usecases/sign_out.dart';
import 'package:flawle/features/auth/domain/usecases/get_current_user.dart';
import 'package:flawle/features/auth/domain/usecases/update_profile.dart';
import 'package:flawle/features/auth/domain/usecases/verify_otp.dart';
import 'package:flawle/features/auth/domain/usecases/resend_otp.dart';
import 'package:flawle/features/auth/domain/usecases/request_password_reset.dart';
import 'package:flawle/features/auth/domain/usecases/verify_password_reset_otp.dart';
import 'package:flawle/features/auth/domain/usecases/reset_password.dart';
import 'auth_repository_provider.dart';

final signInProvider = Provider<SignIn>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return SignIn(repo);
});

final signUpProvider = Provider<SignUp>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return SignUp(repo);
});

final signOutProvider = Provider<SignOut>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return SignOut(repo);
});

final getCurrentUserProvider = Provider<GetCurrentUser>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return GetCurrentUser(repo);
});

final updateProfileProvider = Provider<UpdateProfile>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return UpdateProfile(repo);
});

final verifyOtpProvider = Provider<VerifyOtp>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return VerifyOtp(repo);
});

final resendOtpProvider = Provider<ResendOtp>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return ResendOtp(repo);
});

final requestPasswordResetProvider = Provider<RequestPasswordReset>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return RequestPasswordReset(repo);
});

final verifyPasswordResetOtpProvider = Provider<VerifyPasswordResetOtp>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return VerifyPasswordResetOtp(repo);
});

final resetPasswordProvider = Provider<ResetPassword>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return ResetPassword(repo);
});
