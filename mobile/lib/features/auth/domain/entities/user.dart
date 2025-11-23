import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String? id;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? password;
  final String? phone;
  final bool isVerified;

  const User({
    this.id,
    this.firstName,
    this.lastName,
    this.email,
    this.password,
    this.phone,
    this.isVerified = false,
  });

  @override
  List<Object?> get props => [
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    isVerified,
  ];
}
