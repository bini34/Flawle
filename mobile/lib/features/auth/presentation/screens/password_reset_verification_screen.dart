import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/features/auth/presentation/provider/auth_usecases.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/auth/presentation/provider/password_reset_provider.dart';

class PasswordResetVerificationScreen extends HookConsumerWidget {
  const PasswordResetVerificationScreen({
    super.key,
    this.email,
    this.length = 6,
  });
  final String? email; // Prefer provider state when null
  final int length;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final primary = theme.colorScheme.primary;
    final controllers = List.generate(
      length,
      (_) => useTextEditingController(),
      growable: false,
    );
    final focuses = List.generate(length, (_) => FocusNode(), growable: false);
    for (var i = 0; i < length; i++) {
      useListenable(controllers[i]);
      useListenable(focuses[i]);
    }
    String getCode() => controllers.map((c) => c.text).join();
    void handleChanged(int index, String value) {
      if (value.length > 1) {
        final chars = value.replaceAll(RegExp(r'\D'), '');
        for (var i = 0; i < length && i < chars.length; i++) {
          controllers[i].text = chars[i];
        }
        final last = (chars.length - 1).clamp(0, length - 1);
        focuses[last].requestFocus();
        if (chars.length >= length) FocusScope.of(context).unfocus();
        return;
      }
      if (value.isNotEmpty && index < length - 1) {
        focuses[index + 1].requestFocus();
      }
      if (value.isEmpty && index > 0) focuses[index - 1].requestFocus();
    }

    Widget buildOtpBox(int index) {
      final hasText = controllers[index].text.isNotEmpty;
      final isFocused = focuses[index].hasFocus;
      final borderColor = (isFocused || hasText)
          ? primary
          : theme.dividerColor.withValues(alpha: 0.6);
      return SizedBox(
        width: 45,
        child: TextField(
          controller: controllers[index],
          focusNode: focuses[index],
          autofocus: index == 0,
          textAlign: TextAlign.center,
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w700,
          ),
          keyboardType: TextInputType.number,
          inputFormatters: [
            FilteringTextInputFormatter.digitsOnly,
            LengthLimitingTextInputFormatter(1),
          ],
          onChanged: (v) => handleChanged(index, v),
          decoration: InputDecoration(
            counterText: '',
            filled: true,
            fillColor: theme.colorScheme.surface,
            contentPadding: const EdgeInsets.symmetric(vertical: 14),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: borderColor, width: 1.5),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: primary, width: 2),
            ),
          ),
        ),
      );
    }

    final submitting = useState(false);

    Future<void> onConfirm() async {
      final code = getCode();
      if (code.length != length) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Please enter the $length-digit code.')),
        );
        return;
      }
      final storedEmail = ref.read(passwordResetProvider).data?.email;
      final effectiveEmail = (email != null && email!.isNotEmpty)
          ? email!
          : (storedEmail ?? '');
      if (effectiveEmail.isEmpty) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Missing email context')));
        return;
      }
      if (submitting.value) return;
      submitting.value = true;
      final result = await ref
          .read(verifyPasswordResetOtpProvider)
          .call(email: effectiveEmail, code: code);
      result.fold(
        (err) => ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(err))),
        (_) {
          ref.read(passwordResetProvider).setCode(code);
          context.goNamed(
            RouteNames.resetPassword,
            extra: {'email': effectiveEmail, 'code': code},
          );
        },
      );
      submitting.value = false;
    }

    Future<void> onResend() async {
      final storedEmail = ref.read(passwordResetProvider).data?.email;
      final effectiveEmail = (email != null && email!.isNotEmpty)
          ? email!
          : (storedEmail ?? '');
      if (effectiveEmail.isEmpty) return;
      if (submitting.value) return;
      submitting.value = true;
      final result = await ref
          .read(requestPasswordResetProvider)
          .call(effectiveEmail);
      result.fold(
        (err) => ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(err))),
        (_) => ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Code resent.'))),
      );
      submitting.value = false;
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify Reset Code'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded),
          onPressed: () => Navigator.of(context).maybePop(),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            Text(
              'Enter the code sent to your email',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var i = 0; i < length; i++) ...[
                  buildOtpBox(i),
                  if (i != length - 1) const SizedBox(width: 6),
                ],
              ],
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: submitting.value ? null : onResend,
                child: const Text('Resend Code'),
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: submitting.value ? null : onConfirm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: submitting.value
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Text('Confirm'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
