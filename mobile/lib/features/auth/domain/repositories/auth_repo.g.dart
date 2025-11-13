// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_repo.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(authRepo)
const authRepoProvider = AuthRepoProvider._();

final class AuthRepoProvider
    extends $FunctionalProvider<AuthRepo, AuthRepo, AuthRepo>
    with $Provider<AuthRepo> {
  const AuthRepoProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'authRepoProvider',
        isAutoDispose: false,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$authRepoHash();

  @$internal
  @override
  $ProviderElement<AuthRepo> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  AuthRepo create(Ref ref) {
    return authRepo(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(AuthRepo value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<AuthRepo>(value),
    );
  }
}

String _$authRepoHash() => r'16aa1c00828ae3118d562ce16392e42a28a1135c';
