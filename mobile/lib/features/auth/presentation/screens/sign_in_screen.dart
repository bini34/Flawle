import 'package:flawle/features/auth/presentation/widgets/social_auth_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flawle/features/auth/presentation/provider/auth_provider.dart';
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';

class SignInScreen extends HookConsumerWidget {
  const SignInScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Controllers & state
    final emailController = useTextEditingController();
    final passwordController = useTextEditingController();
    final obscurePassword = useState(true);
    final emailError = useState<String?>(null);
    final passwordError = useState<String?>(null);

    final theme = Theme.of(context);
    final accent = theme.colorScheme.primary;

    // Auth state
    final authState = ref.watch(authProvider);
    final isLoading = authState.maybeWhen(
      signingIn: () => true,
      orElse: () => false,
    );

    // Side-effects: navigate on success, show error on failure
    ref.listen(authProvider, (previous, next) {
      next.maybeWhen(
        success: (user) {
          if (!context.mounted) return;
          context.goNamed(RouteNames.productList);
        },
        errorSigningIn: (msg) {
          if (!context.mounted) return;
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text(msg)));
        },
        orElse: () {},
      );
    });

    return Scaffold(
      appBar: AppBar(
      backgroundColor: Colors.white,
        elevation: 0, // optional, removes shadow
        title: Text(
          'Welcome back',
          style: theme.textTheme.displayLarge?.copyWith(
            fontSize: 28,
            fontWeight: FontWeight.w600,
            color: accent,
          ),
        ),
        centerTitle: true, // optional
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: SingleChildScrollView(
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            physics: const BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 28),
                // Email label
                Text(
                  'Email',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: emailController,
                  keyboardType: TextInputType.emailAddress,
                  onChanged: (v) {
                    if (v.trim().isNotEmpty) emailError.value = null;
                  },
                  decoration: InputDecoration(
                    hintText: 'Enter email',
                    errorText: emailError.value,
                  ),
                ),
                const SizedBox(height: 20),
                // Password label & "Forgot"
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Password',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    InkWell(
                      onTap: () {
                        context.goNamed(RouteNames.forgotPassword);
                      },
                      child: Text(
                        'Forgot your password?',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: accent,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: passwordController,
                  obscureText: obscurePassword.value,
                  onChanged: (v) {
                    if (v.trim().isNotEmpty) passwordError.value = null;
                  },
                  decoration: InputDecoration(
                    hintText: 'Enter password',
                    errorText: passwordError.value,
                    suffixIcon: IconButton(
                      icon: Icon(
                        obscurePassword.value
                            ? Icons.visibility_off
                            : Icons.visibility,
                      ),
                      onPressed: () =>
                          obscurePassword.value = !obscurePassword.value,
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                // Log In button
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.black,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      textStyle: theme.textTheme.labelLarge?.copyWith(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    onPressed: isLoading
                        ? null
                        : () {
                            final email = emailController.text.trim();
                            final password = passwordController.text.trim();
                            bool hasError = false;
                            if (email.isEmpty) {
                              emailError.value = 'Email is required';
                              hasError = true;
                            } else {
                              emailError.value = null;
                            }
                            if (password.isEmpty) {
                              passwordError.value = 'Password is required';
                              hasError = true;
                            } else {
                              passwordError.value = null;
                            }
                            if (hasError) return;
                            ref
                                .read(authProvider.notifier)
                                .signIn(email, password);
                          },
                    child: isLoading
                        ? const SizedBox(
                            width: 22,
                            height: 22,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Text('Log In'),
                  ),
                ),
                const SizedBox(height: 28),
                // Divider with text
                Row(
                  children: [
                    const Expanded(child: Divider(thickness: 1)),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Text(
                        'or continue with',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.dividerColor,
                        ),
                      ),
                    ),
                    const Expanded(child: Divider(thickness: 1)),
                  ],
                ),
                const SizedBox(height: 20),
                // Social buttons row
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    SocialAuthButton(icon: Icons.g_mobiledata),
                    SizedBox(width: 16),
                    SocialAuthButton(icon: Icons.facebook),
                    SizedBox(width: 16),
                    SocialAuthButton(icon: Icons.apple),
                  ],
                ),
                const SizedBox(height: 24),
                // Bottom sign-up prompt
                Center(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Text(
                        "Don't have an account? ",
                        style: theme.textTheme.bodySmall,
                      ),
                      InkWell(
                        onTap: () => context.goNamed(RouteNames.signUp),
                        child: Text(
                          'Sign Up',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: accent,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
