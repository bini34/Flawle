// presentation/providers/auth_repository_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flawle/features/auth/domain/repositories/auth_repo.dart';

/// Simple alias provider that exposes the domain `authRepoProvider`
/// to presentation layer without code generation.
final authRepositoryProvider = Provider<AuthRepo>((ref) {
  return ref.read(authRepoProvider);
});
