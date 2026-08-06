import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/auth/presentation/provider/auth_provider.dart';
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';

class ProfileScreen extends HookConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final state = ref.watch(authProvider);
    final user = state.maybeWhen(success: (u) => u, orElse: () => null);

    String initials() {
      final first = (user?.firstName ?? '').trim();
      final last = (user?.lastName ?? '').trim();
      final f = first.isNotEmpty ? first[0] : '';
      final l = last.isNotEmpty ? last[0] : '';
      return (f + l).toUpperCase().padRight(2, '•');
    }

    Future<void> logout() async {
      await ref.read(authProvider.notifier).signOut();
      if (!context.mounted) return;
      context.goNamed(RouteNames.signIn);
    }

    Widget sectionSpacer() => const SizedBox(height: 16);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        elevation: 0,
        actions: [
          IconButton(
            tooltip: 'Logout',
            icon: const Icon(Icons.logout_rounded),
            onPressed: logout,
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // User image
              const SizedBox(height: 12),
              Center(
                child: CircleAvatar(
                  radius: 72,
                  backgroundColor: theme.colorScheme.primary.withValues(alpha: 0.12),
                  child: Text(
                    initials(),
                    style: theme.textTheme.displaySmall?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: Colors.black87,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 28),

              // User name and email
              Column(
                children: [
                  Text(
                    [user?.firstName, user?.lastName]
                            .where((e) => (e ?? '').trim().isNotEmpty)
                            .join(' ')
                            .trim()
                            .isNotEmpty
                        ? [
                            user?.firstName,
                            user?.lastName,
                          ].where((e) => (e ?? '').trim().isNotEmpty).join(' ')
                        : 'Guest',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    user?.email ?? 'No email',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.textTheme.bodyMedium?.color?.withValues(
                        alpha: 0.7,
                      ),
                    ),
                  ),
                ],
              ),

              sectionSpacer(),

              // Menu items (no box)
              _MenuItem(
                icon: Icons.person_outline,
                label: 'Personal Info',
                onTap: () => _comingSoon(context),
              ),
              _MenuItem(
                icon: Icons.credit_card_outlined,
                label: 'Payments',
                onTap: () => _comingSoon(context),
              ),
              _MenuItem(
                icon: Icons.reviews_outlined,
                label: 'Orders and Reviews',
                onTap: () => _comingSoon(context),
              ),
              _MenuItem(
                icon: Icons.assignment_return_outlined,
                label: 'Returns',
                onTap: () => _comingSoon(context),
              ),
              _MenuItem(
                icon: Icons.notifications_outlined,
                label: 'Notifications',
                onTap: () => _comingSoon(context),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}

class _MenuItem extends StatelessWidget {
  const _MenuItem({
    required this.icon,
    required this.label,
    required this.onTap,
  });
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.black87),
      title: Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
      trailing: const Icon(Icons.chevron_right_rounded),
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    );
  }
}

void _comingSoon(BuildContext context) {
  ScaffoldMessenger.of(
    context,
  ).showSnackBar(const SnackBar(content: Text('Coming soon')));
}
