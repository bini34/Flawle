import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/ai_assistant/presentation/screens/ai_chat_screen.dart';
import 'package:flawle/features/auth/presentation/screens/verifficationScreen.dart';
import 'package:flawle/features/cart/presentation/screens/cartScreen.dart';
import 'package:flawle/features/auth/presentation/screens/signInScreen.dart';
import 'package:flawle/features/auth/presentation/screens/signUpScreen.dart';
import 'package:flawle/features/main_screen.dart';
import 'package:flawle/features/onboarding/presentation/screens/onboarding_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_catalog_screen.dart';
import 'package:flawle/features/products/presentation/screens/product_detail.dart';
import 'package:flawle/features/products/presentation/screens/product_list_screen.dart';
import 'package:flawle/features/profile/presentation/screens/profileScreen.dart';
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
        path: "/splash-screen",
        builder: (context, state) => const SplashScreen(),
      ),

      GoRoute(
        name: RouteNames.onboarding,
        path: "/onboarding",
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        name: RouteNames.signIn,
        path: "/sign-in",
        builder: (context, state) => const SignInScreen(),
      ),
      GoRoute(
        name: RouteNames.signUp,
        path: "/sign-up",
        builder: (context, state) => const SignUpScreen(),
      ),
      GoRoute(
        name: RouteNames.verification,
        path: "/verification",
        builder: (context, state) => const VerificationScreen(),
      ),
      GoRoute(
        name: RouteNames.productDetail,
        path: "/product-detail/:id",
        builder: (context, state) {
          final productId = state.pathParameters['id'];
          return ProductDetailScreen(productId: productId);
        },
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
                path: "/product-list",
                builder: (context, state) => const ProductListScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.catalog,
                path: "/catalog",
                builder: (context, state) => const ProductCatalogScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.aiAssistant,
                path: "/ai-assistant",
                builder: (context, state) => const AIChatScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.cart,
                path: "/cart",
                builder: (context, state) => const CartScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                name: RouteNames.profile,
                path: "/profile",
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
        ],
      ),
    
    ],
  );
});
