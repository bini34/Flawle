// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'auth_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$AuthState {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AuthState);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthState()';
}


}

/// @nodoc
class $AuthStateCopyWith<$Res>  {
$AuthStateCopyWith(AuthState _, $Res Function(AuthState) __);
}


/// Adds pattern-matching-related methods to [AuthState].
extension AuthStatePatterns on AuthState {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( _Initial value)?  initial,TResult Function( _SigningIn value)?  signingIn,TResult Function( _SigningUp value)?  signingUp,TResult Function( _GettingSignedInUser value)?  gettingSignedInUser,TResult Function( _Success value)?  success,TResult Function( _Error value)?  errorSigningUp,TResult Function( _ErrorSigningIn value)?  errorSigningIn,required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Initial() when initial != null:
return initial(_that);case _SigningIn() when signingIn != null:
return signingIn(_that);case _SigningUp() when signingUp != null:
return signingUp(_that);case _GettingSignedInUser() when gettingSignedInUser != null:
return gettingSignedInUser(_that);case _Success() when success != null:
return success(_that);case _Error() when errorSigningUp != null:
return errorSigningUp(_that);case _ErrorSigningIn() when errorSigningIn != null:
return errorSigningIn(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( _Initial value)  initial,required TResult Function( _SigningIn value)  signingIn,required TResult Function( _SigningUp value)  signingUp,required TResult Function( _GettingSignedInUser value)  gettingSignedInUser,required TResult Function( _Success value)  success,required TResult Function( _Error value)  errorSigningUp,required TResult Function( _ErrorSigningIn value)  errorSigningIn,}){
final _that = this;
switch (_that) {
case _Initial():
return initial(_that);case _SigningIn():
return signingIn(_that);case _SigningUp():
return signingUp(_that);case _GettingSignedInUser():
return gettingSignedInUser(_that);case _Success():
return success(_that);case _Error():
return errorSigningUp(_that);case _ErrorSigningIn():
return errorSigningIn(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( _Initial value)?  initial,TResult? Function( _SigningIn value)?  signingIn,TResult? Function( _SigningUp value)?  signingUp,TResult? Function( _GettingSignedInUser value)?  gettingSignedInUser,TResult? Function( _Success value)?  success,TResult? Function( _Error value)?  errorSigningUp,TResult? Function( _ErrorSigningIn value)?  errorSigningIn,}){
final _that = this;
switch (_that) {
case _Initial() when initial != null:
return initial(_that);case _SigningIn() when signingIn != null:
return signingIn(_that);case _SigningUp() when signingUp != null:
return signingUp(_that);case _GettingSignedInUser() when gettingSignedInUser != null:
return gettingSignedInUser(_that);case _Success() when success != null:
return success(_that);case _Error() when errorSigningUp != null:
return errorSigningUp(_that);case _ErrorSigningIn() when errorSigningIn != null:
return errorSigningIn(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  initial,TResult Function()?  signingIn,TResult Function()?  signingUp,TResult Function()?  gettingSignedInUser,TResult Function( User user)?  success,TResult Function( String message)?  errorSigningUp,TResult Function( String message)?  errorSigningIn,required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Initial() when initial != null:
return initial();case _SigningIn() when signingIn != null:
return signingIn();case _SigningUp() when signingUp != null:
return signingUp();case _GettingSignedInUser() when gettingSignedInUser != null:
return gettingSignedInUser();case _Success() when success != null:
return success(_that.user);case _Error() when errorSigningUp != null:
return errorSigningUp(_that.message);case _ErrorSigningIn() when errorSigningIn != null:
return errorSigningIn(_that.message);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  initial,required TResult Function()  signingIn,required TResult Function()  signingUp,required TResult Function()  gettingSignedInUser,required TResult Function( User user)  success,required TResult Function( String message)  errorSigningUp,required TResult Function( String message)  errorSigningIn,}) {final _that = this;
switch (_that) {
case _Initial():
return initial();case _SigningIn():
return signingIn();case _SigningUp():
return signingUp();case _GettingSignedInUser():
return gettingSignedInUser();case _Success():
return success(_that.user);case _Error():
return errorSigningUp(_that.message);case _ErrorSigningIn():
return errorSigningIn(_that.message);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  initial,TResult? Function()?  signingIn,TResult? Function()?  signingUp,TResult? Function()?  gettingSignedInUser,TResult? Function( User user)?  success,TResult? Function( String message)?  errorSigningUp,TResult? Function( String message)?  errorSigningIn,}) {final _that = this;
switch (_that) {
case _Initial() when initial != null:
return initial();case _SigningIn() when signingIn != null:
return signingIn();case _SigningUp() when signingUp != null:
return signingUp();case _GettingSignedInUser() when gettingSignedInUser != null:
return gettingSignedInUser();case _Success() when success != null:
return success(_that.user);case _Error() when errorSigningUp != null:
return errorSigningUp(_that.message);case _ErrorSigningIn() when errorSigningIn != null:
return errorSigningIn(_that.message);case _:
  return null;

}
}

}

/// @nodoc


class _Initial implements AuthState {
  const _Initial();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Initial);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthState.initial()';
}


}




/// @nodoc


class _SigningIn implements AuthState {
  const _SigningIn();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SigningIn);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthState.signingIn()';
}


}




/// @nodoc


class _SigningUp implements AuthState {
  const _SigningUp();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SigningUp);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthState.signingUp()';
}


}




/// @nodoc


class _GettingSignedInUser implements AuthState {
  const _GettingSignedInUser();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _GettingSignedInUser);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthState.gettingSignedInUser()';
}


}




/// @nodoc


class _Success implements AuthState {
  const _Success(this.user);
  

 final  User user;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SuccessCopyWith<_Success> get copyWith => __$SuccessCopyWithImpl<_Success>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Success&&(identical(other.user, user) || other.user == user));
}


@override
int get hashCode => Object.hash(runtimeType,user);

@override
String toString() {
  return 'AuthState.success(user: $user)';
}


}

/// @nodoc
abstract mixin class _$SuccessCopyWith<$Res> implements $AuthStateCopyWith<$Res> {
  factory _$SuccessCopyWith(_Success value, $Res Function(_Success) _then) = __$SuccessCopyWithImpl;
@useResult
$Res call({
 User user
});




}
/// @nodoc
class __$SuccessCopyWithImpl<$Res>
    implements _$SuccessCopyWith<$Res> {
  __$SuccessCopyWithImpl(this._self, this._then);

  final _Success _self;
  final $Res Function(_Success) _then;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? user = null,}) {
  return _then(_Success(
null == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User,
  ));
}


}

/// @nodoc


class _Error implements AuthState {
  const _Error(this.message);
  

 final  String message;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ErrorCopyWith<_Error> get copyWith => __$ErrorCopyWithImpl<_Error>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Error&&(identical(other.message, message) || other.message == message));
}


@override
int get hashCode => Object.hash(runtimeType,message);

@override
String toString() {
  return 'AuthState.errorSigningUp(message: $message)';
}


}

/// @nodoc
abstract mixin class _$ErrorCopyWith<$Res> implements $AuthStateCopyWith<$Res> {
  factory _$ErrorCopyWith(_Error value, $Res Function(_Error) _then) = __$ErrorCopyWithImpl;
@useResult
$Res call({
 String message
});




}
/// @nodoc
class __$ErrorCopyWithImpl<$Res>
    implements _$ErrorCopyWith<$Res> {
  __$ErrorCopyWithImpl(this._self, this._then);

  final _Error _self;
  final $Res Function(_Error) _then;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? message = null,}) {
  return _then(_Error(
null == message ? _self.message : message // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

/// @nodoc


class _ErrorSigningIn implements AuthState {
  const _ErrorSigningIn(this.message);
  

 final  String message;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ErrorSigningInCopyWith<_ErrorSigningIn> get copyWith => __$ErrorSigningInCopyWithImpl<_ErrorSigningIn>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ErrorSigningIn&&(identical(other.message, message) || other.message == message));
}


@override
int get hashCode => Object.hash(runtimeType,message);

@override
String toString() {
  return 'AuthState.errorSigningIn(message: $message)';
}


}

/// @nodoc
abstract mixin class _$ErrorSigningInCopyWith<$Res> implements $AuthStateCopyWith<$Res> {
  factory _$ErrorSigningInCopyWith(_ErrorSigningIn value, $Res Function(_ErrorSigningIn) _then) = __$ErrorSigningInCopyWithImpl;
@useResult
$Res call({
 String message
});




}
/// @nodoc
class __$ErrorSigningInCopyWithImpl<$Res>
    implements _$ErrorSigningInCopyWith<$Res> {
  __$ErrorSigningInCopyWithImpl(this._self, this._then);

  final _ErrorSigningIn _self;
  final $Res Function(_ErrorSigningIn) _then;

/// Create a copy of AuthState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? message = null,}) {
  return _then(_ErrorSigningIn(
null == message ? _self.message : message // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
