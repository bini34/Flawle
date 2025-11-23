import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flawle/features/auth/presentation/provider/auth_usecases.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';

class ResetPasswordScreen extends HookConsumerWidget {
  const ResetPasswordScreen({super.key, this.email, this.code});
  final String? email;
  final String? code;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final newPasswordController = useTextEditingController();
    final confirmPasswordController = useTextEditingController();
    final submitting = useState(false);
    final theme = Theme.of(context);

    Future<void> submit() async {
      final newPass = newPasswordController.text.trim();
      final confirm = confirmPasswordController.text.trim();
      if (email == null || email!.isEmpty || code == null || code!.isEmpty) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Missing reset context')));
        return;
      }
      if (submitting.value) return;
      submitting.value = true;
      final result = await ref
          .read(resetPasswordProvider)
          .call(
            email: email!,
            code: code!,
            newPassword: newPass,
            confirmPassword: confirm,
          );
      result.fold(
        (err) => ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(err))),
        (_) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Password updated. Please sign in.')),
          );
          context.goNamed(RouteNames.signIn);
        },
      );
      submitting.value = false;
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Create New Password')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Enter a new password',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: newPasswordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'New Password',
                hintText: 'Enter new password',
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: confirmPasswordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Confirm Password',
                hintText: 'Re-enter new password',
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: submitting.value ? null : submit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
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
                    : const Text('Reset Password'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
