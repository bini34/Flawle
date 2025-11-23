import 'package:json_annotation/json_annotation.dart';
import '../../domain/entities/user.dart';

part 'userModel.g.dart';

@JsonSerializable()
class UserModel {
  @JsonKey(name: 'id')
  final String id;
  @JsonKey(name: 'email')
  final String email;

  @JsonKey(name: 'first_name')
  final String firstName;

  @JsonKey(name: 'last_name')
  final String lastName;
  @JsonKey(name: 'phone')
  final String phone;
  // Do not read/write password in normal API flows
  @JsonKey(name: 'password', includeFromJson: false, includeToJson: false)
  final String? password;
  @JsonKey(name: 'role', defaultValue: 'USER')
  final String role;

  @JsonKey(name: 'is_verified')
  final bool isVerified;

  const UserModel({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    this.password,
    required this.phone,
    required this.role,
    required this.isVerified,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  // Default serialization excludes password; use toCreateJson() when needed
  Map<String, dynamic> toJson() {
    final data = _$UserModelToJson(this);
    // Ensure we never send a null password key
    data.remove('password');
    return data;
  }

  /// Create-only payload for signup (no id/isVerified)
  Map<String, dynamic> toCreateJson() => <String, dynamic>{
    'email': email,
    'first_name': firstName,
    'last_name': lastName,
    if (password != null) 'password': password,
    'phone': phone,
    'role': role,
  };

  // ==================== TO DOMAIN ====================
  User toDomain() => User(
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    isVerified: isVerified,
  );

  // ==================== FROM ENTITY ====================
  UserModel copyFromEntity(User user) => UserModel(
    id: user.id ?? '',
    email: user.email ?? '',
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    phone: user.phone ?? '',
    password: user.password,
    role: 'USER',
    isVerified: user.isVerified,
  );

  // ==================== COPYWITH ====================
  UserModel copyWith({
    String? id,
    String? email,
    String? firstName,
    String? lastName,
    String? phone,
    String? password,
    String? role,
    bool? isVerified,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phone: phone ?? this.phone,
      password: password ?? this.password,
      role: role ?? this.role,
      isVerified: isVerified ?? this.isVerified,
    );
  }
}

// ==================== EXTENSION: User → UserModel ====================
extension UserEntityX on User {
  UserModel toModel() => UserModel(
    id: id ?? '',
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email: email ?? '',
    phone: phone ?? '',
    password: password,
    role: 'USER',
    isVerified: isVerified,
  );
}
