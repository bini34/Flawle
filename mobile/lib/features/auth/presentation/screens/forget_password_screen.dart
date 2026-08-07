import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/features/auth/presentation/provider/auth_usecases.dart';
import 'package:flawle/features/auth/presentation/provider/password_reset_provider.dart';

class ForgetPasswordScreen extends HookConsumerWidget {
  const ForgetPasswordScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final emailController = useTextEditingController();
    final submitting = useState(false);
    final theme = Theme.of(context);

    Future<void> submit() async {
      final email = emailController.text.trim();
      if (email.isEmpty) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Email required')));
        return;
      }
      if (submitting.value) return;
      submitting.value = true;
      final result = await ref.read(requestPasswordResetProvider).call(email);
      result.fold(
        (err) => ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(err))),
        (_) {
          // store email in password reset provider
          ref.read(passwordResetProvider).setEmail(email);
          context.goNamed(
            'password-reset-verification',
            extra: {'email': email},
          );
        },
      );
      submitting.value = false;
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Forgot Password')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Reset your password',
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Enter the email associated with your account and we\'ll send you a verification code.',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.textTheme.bodyMedium?.color?.withValues(alpha: .7),
              ),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: 'Email',
                hintText: 'Enter your email',
              ),
              onSubmitted: (_) => submit(),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: submitting.value ? null : submit,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
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
                    : const Text('Send Code'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
