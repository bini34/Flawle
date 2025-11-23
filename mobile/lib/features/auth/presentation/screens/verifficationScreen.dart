import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/auth/presentation/provider/auth_provider.dart';
import 'package:flawle/features/auth/presentation/provider/auth_usecases.dart';
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';

class VerificationScreen extends HookConsumerWidget {
  const VerificationScreen({super.key, this.length = 6});

  /// Number of OTP digits. Matches the screenshot (five boxes).
  final int length;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final primary = theme.colorScheme.primary;

    // Controllers and focus nodes for each OTP box
    final controllers = List.generate(
      length,
      (_) => useTextEditingController(),
      growable: false,
    );
    final focuses = List.generate(length, (_) => FocusNode(), growable: false);

    // Rebuild when any controller text or focus changes
    for (var i = 0; i < length; i++) {
      useListenable(controllers[i]);
      useListenable(focuses[i]);
    }

    String getCode() => controllers.map((c) => c.text).join();

    void handleChanged(int index, String value) {
      // Handle paste of multiple digits
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

      // Single char typed
      if (value.isNotEmpty && index < length - 1) {
        focuses[index + 1].requestFocus();
      }
      if (value.isEmpty && index > 0) {
        // If user cleared, go back to previous box for convenience
        focuses[index - 1].requestFocus();
      }
    }

    Widget buildOtpBox(int index) {
      final hasText = controllers[index].text.isNotEmpty;
      final isFocused = focuses[index].hasFocus;
      final borderColor = (isFocused || hasText)
          ? primary
          : theme.dividerColor.withOpacity(0.6);

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

    void onConfirm() async {
      final code = getCode();
      if (code.length != length) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Please enter the $length-digit code.')),
        );
        return;
      }
      if (submitting.value) return;
      submitting.value = true;

      final authState = ref.read(authProvider);
      final email = authState.maybeWhen(
        success: (u) => u.email,
        orElse: () => null,
      );
      final phone = authState.maybeWhen(
        success: (u) => u.phone,
        orElse: () => null,
      );

      final result = await ref
          .read(verifyOtpProvider)
          .call(email: email, phone: phone, code: code);

      result.fold(
        (err) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text(err)));
        },
        (_) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Verification successful. '),
            ),
          );
          context.goNamed(RouteNames.signIn);
        },
      );

      submitting.value = false;
    }

    void onResend() async {
      if (submitting.value) return;
      submitting.value = true;
      final authState = ref.read(authProvider);
      final email = authState.maybeWhen(
        success: (u) => u.email,
        orElse: () => null,
      );
      final phone = authState.maybeWhen(
        success: (u) => u.phone,
        orElse: () => null,
      );
      final result = await ref
          .read(resendOtpProvider)
          .call(email: email, phone: phone);
      result.fold(
        (err) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text(err)));
        },
        (_) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Verification code resent.')),
          );
        },
      );
      submitting.value = false;
    }

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        elevation: 0,
        backgroundColor: theme.scaffoldBackgroundColor,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded),
          color: theme.colorScheme.onSurface,
          onPressed: () => Navigator.of(context).maybePop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 8),
              Text(
                'Verification code',
                style: theme.textTheme.headlineSmall?.copyWith(
                  color: primary,
                  fontWeight: FontWeight.w700,
                  fontFamily: 'ClashGrotesk',
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'To ensure the security of your account we sent a code. Please check your text messages for a code and enter it below.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.textTheme.bodyMedium?.color?.withOpacity(0.8),
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
              Text(
                "If you haven't received a code, please click the 'Resend Code' button. If you need assistance, please contact our ",
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.textTheme.bodySmall?.color?.withOpacity(0.7),
                ),
              ),
              GestureDetector(
                onTap: () {
                  // TODO: Navigate to support/help center
                },
                child: Text(
                  'Support',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: onResend,
                  style: OutlinedButton.styleFrom(
                    backgroundColor: theme.colorScheme.surface,
                    side: BorderSide(
                      color: theme.dividerColor.withOpacity(0.6),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
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
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
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
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
