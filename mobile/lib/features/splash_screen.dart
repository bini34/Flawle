import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class SplashScreen extends HookConsumerWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isMounted = useIsMounted();
    useEffect(() {
      Future.delayed(const Duration(seconds: 2)).then((_) {
        if (!isMounted()) return;
        _getCurrentUser(ref, context);
      });
      return null;
    }, []);

    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Spacer(),
          Center(
            child: Image.asset(
              'assets/images/logo.jpg',
              width: 150,
              errorBuilder: (context, error, stackTrace) => const Icon(
                Icons.image_not_supported_outlined,
                size: 64,
                color: Colors.grey,
              ),
            ),
          ),
          const Spacer(),
        ],
      ),
    );
  }

  void _getCurrentUser(WidgetRef ref, BuildContext context) async {
    // TODO: Replace with actual user lookup (e.g. ref.read(authNotifierProvider))
    final user = null; // Simulated unauthenticated state
    if (!context.mounted) return;

    if (user != null) {
      // Authenticated: go to main product list
      context.goNamed(RouteNames.productList);
    } else {
      // Not authenticated: go to sign in
      context.goNamed(RouteNames.signIn);
    }
  }
}
