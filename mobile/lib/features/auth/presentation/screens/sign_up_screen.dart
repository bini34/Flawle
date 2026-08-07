import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/auth/presentation/provider/auth_provider.dart';
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';

class SignUpScreen extends HookConsumerWidget {
  const SignUpScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final accent = theme.colorScheme.primary;

    final firstNameController = useTextEditingController();
    final lastNameController = useTextEditingController();
    final emailController = useTextEditingController();
    final phoneController = useTextEditingController();
    final passwordController = useTextEditingController();
    final obscurePassword = useState(true);
    // Per-field error states
    final firstNameError = useState<String?>(null);
    final lastNameError = useState<String?>(null);
    final emailError = useState<String?>(null);
    final phoneError = useState<String?>(null);
    final passwordError = useState<String?>(null);
    // Provider state and side effects
    final authState = ref.watch(authProvider);
    final isLoading = authState.maybeWhen(
      signingUp: () => true,
      orElse: () => false,
    );

    ref.listen(authProvider, (previous, next) {
      next.maybeWhen(
        success: (_) {
          if (!context.mounted) return;
          context.goNamed(RouteNames.verification);
        },
        errorSigningUp: (msg) {
          if (!context.mounted) return;
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text(msg)));
        },
        orElse: () {},
      );
    });


    void signIn(){
       final first = firstNameController.text.trim();
                            final last = lastNameController.text.trim();
                            final email = emailController.text.trim();
                            final phone = phoneController.text.trim();
                            final pass = passwordController.text.trim();
                            bool hasError = false;
                            if (first.isEmpty) {
                              firstNameError.value = 'First name is required';
                              hasError = true;
                            } else {
                              firstNameError.value = null;
                            }
                            if (last.isEmpty) {
                              lastNameError.value = 'Last name is required';
                              hasError = true;
                            } else {
                              lastNameError.value = null;
                            }
                            if (email.isEmpty) {
                              emailError.value = 'Email is required';
                              hasError = true;
                            } else {
                              emailError.value = null;
                            }
                            if (phone.isEmpty) {
                              phoneError.value = 'Phone number is required';
                              hasError = true;
                            } else {
                              phoneError.value = null;
                            }
                            if (pass.isEmpty) {
                              passwordError.value = 'Password is required';
                              hasError = true;
                            } else {
                              passwordError.value = null;
                            }
                            if (hasError) return;
                            ref
                                .read(authProvider.notifier)
                                .signUp(
                                  firstName: first,
                                  lastName: last,
                                  email: email,
                                  password: pass,
                                  phone: phone,
                                );                       
      
    }

    // Live password checks
    final password = useValueListenable(passwordController);
    final hasLower = useMemoized(
      () => RegExp(r"[a-z]").hasMatch(password.text),
      [password.text],
    );
    final hasUpper = useMemoized(
      () => RegExp(r"[A-Z]").hasMatch(password.text),
      [password.text],
    );
    final hasDigit = useMemoized(() => RegExp(r"\d").hasMatch(password.text), [
      password.text,
    ]);
    final hasSpecial = useMemoized(
      () => RegExp(r"[^A-Za-z0-9]").hasMatch(password.text),
      [password.text],
    );

    return Scaffold(
      appBar: AppBar(  
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
                  'New account',
                  style: theme.textTheme.displayLarge?.copyWith(
                    fontSize: 28,
                    fontWeight: FontWeight.w600,
                    color: accent,
                  ),
                ),),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: SingleChildScrollView(
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            physics: const BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Back
                const SizedBox(height: 4),
                // Heading
               
                const SizedBox(height: 28),
                // Name (First & Last in one row)
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'First name',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: firstNameController,
                            textCapitalization: TextCapitalization.words,
                            onChanged: (v) {
                              if (v.trim().isNotEmpty) {
                                firstNameError.value = null;
                              }
                            },
                            decoration: InputDecoration(
                              hintText: 'Enter first name',
                              errorText: firstNameError.value,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Last name',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: lastNameController,
                            textCapitalization: TextCapitalization.words,
                            onChanged: (v) {
                              if (v.trim().isNotEmpty) {
                                lastNameError.value = null;
                              }
                            },
                            decoration: InputDecoration(
                              hintText: 'Enter last name',
                              errorText: lastNameError.value,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Email
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
                // Phone number
                Text(
                  'Phone number',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: phoneController,
                  keyboardType: TextInputType.phone,
                  onChanged: (v) {
                    if (v.trim().isNotEmpty) phoneError.value = null;
                  },
                  decoration: InputDecoration(
                    hintText: 'Enter phone number',
                    errorText: phoneError.value,
                  ),
                ),
                const SizedBox(height: 20),
                // Password
                Text(
                  'Password',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
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
                const SizedBox(height: 10),
                // Password helper + checks (only show when user types a password)
                if (password.text.isNotEmpty) ...[
                  Text(
                    'Your password must be between 6-24 characters long with no spaces and contain:',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.dividerColor,
                    ),
                  ),
                  const SizedBox(height: 8),
                  PasswordRuleRow(title: 'Lowercase', ok: hasLower),
                  PasswordRuleRow(title: 'Uppercase', ok: hasUpper),
                  PasswordRuleRow(title: 'Numeric', ok: hasDigit),
                  PasswordRuleRow(
                    title: 'Special character',
                    ok: hasSpecial,
                    mutedWhenFalse: true,
                  ),
                ],
                const SizedBox(height: 24),
                // Sign Up button
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
                        : signIn,
                    child: isLoading
                        ? const SizedBox(
                            width: 22,
                            height: 22,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Text('Sign Up'),
                  ),
                ),
                const SizedBox(height: 12),
                // Terms & Conditions
                Center(
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.dividerColor,
                      ),
                      children: [
                        const TextSpan(
                          text: 'By creating an account you agree to ',
                        ),
                        TextSpan(
                          text: 'our Terms and Conditions',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: Colors.black87,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
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
                // Social buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SocialAuthButton(icon: Icons.g_mobiledata),
                    const SizedBox(width: 16),
                    SocialAuthButton(icon: Icons.facebook),
                    const SizedBox(width: 16),
                    SocialAuthButton(icon: Icons.apple),
                  ],
                ),
                const SizedBox(height: 24),
                // Bottom switch to Log In
                Center(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Text(
                        'Already have an account? ',
                        style: theme.textTheme.bodySmall,
                      ),
                      InkWell(
                        onTap: () => context.goNamed(RouteNames.signIn),
                        child: Text(
                          'Log In',
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

class PasswordRuleRow extends StatelessWidget {
  const PasswordRuleRow({
    super.key,
    required this.title,
    required this.ok,
    this.mutedWhenFalse = false,
  });
  final String title;
  final bool ok;
  final bool mutedWhenFalse;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final accent = theme.colorScheme.primary;
    final color = ok
        ? accent
        : (mutedWhenFalse ? theme.dividerColor : Colors.black54);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(
            ok ? Icons.check_circle : Icons.radio_button_unchecked,
            size: 18,
            color: color,
          ),
          const SizedBox(width: 8),
          Text(title, style: theme.textTheme.bodySmall?.copyWith(color: color)),
        ],
      ),
    );
  }
}

class SocialAuthButton extends StatelessWidget {
  const SocialAuthButton({super.key, required this.icon});
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // TODO: Implement social sign up
      },
      borderRadius: BorderRadius.circular(12),
      child: Ink(
        width: 54,
        height: 54,
        decoration: BoxDecoration(
          border: Border.all(color: Theme.of(context).dividerColor),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, size: 28, color: Colors.black87),
      ),
    );
  }
}
