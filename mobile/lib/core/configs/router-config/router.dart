import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/ai_assistant/presentation/screens/ai_chat_screen.dart';
import 'package:flawle/features/auth/presentation/screens/verification_screen.dart';
import 'package:flawle/features/auth/presentation/screens/forget_password_screen.dart';
import 'package:flawle/features/auth/presentation/screens/password_reset_verification_screen.dart';
import 'package:flawle/features/auth/presentation/screens/reset_password_screen.dart';
import 'package:flawle/features/cart/presentation/screens/cart_screen.dart';
import 'package:flawle/features/auth/presentation/screens/sign_in_screen.dart';
import 'package:flawle/features/auth/presentation/screens/sign_up_screen.dart';
import 'package:flawle/features/main_screen.dart';
import 'package:flawle/features/onboarding/presentation/screens/onboarding_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_catalog_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_detail.dart';
import 'package:flawle/features/products/presentation/screens/home_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_search_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_search_result_page.dart';
import 'package:flawle/features/profile/presentation/screens/profile_screen.dart';
import 'package:go_router/go_router.dart';
// import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter/material.dart';
import 'package:flawle/features/splash_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final routeProvider = Provider((ref) {
  return GoRouter(
    initialLocation: '/splash-screen',
    errorBuilder: (context, state) {
      return const Scaffold(body: Center(child: Text('page not found')));
    },
    redirect: (context, state) {
      // Add your redirect logic here
      return null;
    },
    refreshListenable: null,
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        name: RouteNames.splashScreen,
        path: RoutePaths.splashScreen,
        builder: (context, state) => const SplashScreen(),
      ),

      GoRoute(
        name: RouteNames.onboarding,
        path: RoutePaths.onboarding,
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        name: RouteNames.signIn,
        path: RoutePaths.signIn,
        builder: (context, state) => const SignInScreen(),
      ),
      GoRoute(
        name: RouteNames.signUp,
        path: RoutePaths.signUp,
        builder: (context, state) => const SignUpScreen(),
      ),
      GoRoute(
        name: RouteNames.verification,
        path: RoutePaths.verification,
        builder: (context, state) => const VerificationScreen(),
      ),
      GoRoute(
        name: RouteNames.forgotPassword,
        path: RoutePaths.forgotPassword,
        builder: (context, state) => const ForgetPasswordScreen(),
      ),
      GoRoute(
        name: RouteNames.resetPassword,
        path: RoutePaths.resetPassword,
        builder: (context, state) {
          final extra = state.extra as Map<String, dynamic>?;
          final email = extra?['email'] as String?;
          final code = extra?['code'] as String?;
          return ResetPasswordScreen(email: email, code: code);
        },
      ),
      GoRoute(
        name: 'password-reset-verification',
        path: '/password-reset-verification',
        builder: (context, state) {
          final email =
              (state.extra as Map<String, dynamic>?)?['email'] as String?;
          return PasswordResetVerificationScreen(email: email);
        },
      ),
      GoRoute(
        name: RouteNames.productDetail,
        path: RoutePaths.productDetail,
        builder: (context, state) {
          final productId = state.pathParameters['id'];
          return ProductDetailScreen(productId: productId);
        },
      ),
      GoRoute(
        name: RouteNames.productSearch,
        path: RoutePaths.productSearch,
        builder: (context, state) => const ProductSearchScreen(),
      ),
      GoRoute(
        name: RouteNames.productSearchResults,
        path: RoutePaths.productSearchResults,
        builder: (context, state) => const ProductSearchResultPage(),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return MainScreen(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.productList,
                path: RoutePaths.productList,
                builder: (context, state) => const HomeScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.catalog,
                path: RoutePaths.catalog,
                builder: (context, state) => const ProductCatalogScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.aiAssistant,
                path: RoutePaths.aiAssistant,
                builder: (context, state) => const AIChatScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.cart,
                path: RoutePaths.cart,
                builder: (context, state) => const CartScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.profile,
                path: RoutePaths.profile,
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
});
