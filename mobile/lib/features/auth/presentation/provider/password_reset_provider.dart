import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class PasswordResetData {
  final String email;
  final String? code;
  const PasswordResetData({required this.email, this.code});
  PasswordResetData copyWith({String? email, String? code}) =>
      PasswordResetData(email: email ?? this.email, code: code ?? this.code);
}

class PasswordResetNotifier extends ChangeNotifier {
  PasswordResetData? _data;
  PasswordResetData? get data => _data;

  void setEmail(String email) {
    _data = PasswordResetData(email: email);
    notifyListeners();
  }

  void setCode(String code) {
    if (_data == null) return;
    _data = _data!.copyWith(code: code);
    notifyListeners();
  }

  void clear() {
    _data = null;
    notifyListeners();
  }
}

final passwordResetProvider = Provider<PasswordResetNotifier>((ref) {
  return PasswordResetNotifier();
});
