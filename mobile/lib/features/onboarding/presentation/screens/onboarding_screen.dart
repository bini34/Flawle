import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:introduction_screen/introduction_screen.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textStyle = theme.textTheme.displaySmall?.copyWith(
      fontSize: 22,
      fontWeight: FontWeight.w700,
      color: Colors.black87,
      height: 1.2,
    );

    List<PageViewModel> pages = [
      for (int i = 0; i < 3; i++)
        PageViewModel(
          titleWidget: const SizedBox.shrink(),
          bodyWidget: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 8),
              // Top logo
              Center(child: Image.asset('assets/images/logo.jpg', height: 32)),
              const SizedBox(height: 16),
              // Splash image
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Image.asset(
                  'assets/images/onboarding.jpg',
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Text(
                  'Welcome to the most innovative cosmetics mobile store.',
                  textAlign: TextAlign.center,
                  style: textStyle,
                ),
              ),
            ],
          ),
        ),
    ];

    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          children: [
            Expanded(
              child: IntroductionScreen(
                globalBackgroundColor: Colors.white,
                // Remove isBottomSafeArea (not a valid IntroductionScreen param)
                pages: pages,
                safeAreaList: [true, true, true, true],
                // Hide default controls; we'll provide custom CTA buttons below
                showNextButton: false,
                showSkipButton: false,
                showDoneButton: false,
                dotsDecorator: DotsDecorator(
                  activeColor: Colors.black,
                  color: theme.dividerColor,
                  size: const Size(8, 8),
                  activeSize: const Size(8, 8),
                  spacing: const EdgeInsets.symmetric(horizontal: 4),
                ),
              ),
            ),
            const SizedBox(height: 8),
            // Primary: Log In
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  textStyle: theme.textTheme.labelLarge?.copyWith(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                // onPressed: () => context.goNamed(RouteNames.signIn),
                onPressed: () => context.pushNamed(RouteNames.signIn),
                child: const Text('Log In'),
              ),
            ),
            const SizedBox(height: 10),
            // Secondary: Continue as a Guest
            SizedBox(
              width: double.infinity,
              height: 50,
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.black,
                  side: const BorderSide(color: Colors.black12, width: 1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  textStyle: theme.textTheme.labelLarge?.copyWith(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                onPressed: () => context.goNamed(RouteNames.productList),
                child: const Text('Continue as a Guest'),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
