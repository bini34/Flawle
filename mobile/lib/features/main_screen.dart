import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';

class MainScreen extends HookWidget {
  const MainScreen({super.key, required this.navigationShell});
  final StatefulNavigationShell navigationShell;
  void onTapTapped(int index) {
    navigationShell.goBranch(index);
  }

  @override
  Widget build(BuildContext context) {
    final selectedIndex = navigationShell.currentIndex;
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: NavigationBar(
        onDestinationSelected: onTapTapped,
        selectedIndex: selectedIndex,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysHide,
        indicatorColor: Colors.transparent,
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.home_outlined),

            selectedIcon: const _UnderlineIcon(
              child: Icon(Icons.home_outlined),
            ),
            label: 'Home',
          ),
          NavigationDestination(
            icon: const Icon(Icons.search),
            selectedIcon: const _UnderlineIcon(child: Icon(Icons.search)),
            label: 'Catalog',
          ),
          NavigationDestination(
            icon: const Icon(Icons.chat_bubble_outline),
            selectedIcon: const _UnderlineIcon(
              child: Icon(Icons.chat_bubble_outline),
            ),
            label: 'ai-assistant',
          ),
          NavigationDestination(
            icon: const _BadgeIcon(
              icon: Icon(Icons.shopping_cart_outlined),
              label: '0',
            ),
            selectedIcon: const _UnderlineIcon(
              child: _BadgeIcon(
                icon: Icon(Icons.shopping_cart_outlined),
                label: '0',
              ),
            ),
            label: 'Cart',
          ),
          NavigationDestination(
            icon: const Icon(Icons.person_outline),
            selectedIcon: const _UnderlineIcon(
              child: Icon(Icons.person_outline),
            ),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class _UnderlineIcon extends ConsumerWidget {
  const _UnderlineIcon({required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Stack(
      alignment: Alignment.center,
      clipBehavior: Clip.none,
      children: [
        child,
        const Positioned(bottom: -4, child: _UnderlineBar()),
      ],
    );
  }
}

class _UnderlineBar extends ConsumerWidget {
  const _UnderlineBar();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      width: 22,
      height: 3,
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }
}

class _BadgeIcon extends ConsumerWidget {
  const _BadgeIcon({
    required this.icon,
    required this.label,
    this.backgroundColor = Colors.black,
  });
  final Widget icon;
  final String label;
  final Color backgroundColor;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        icon,
        Positioned(
          right: -6,
          top: -4,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
            decoration: BoxDecoration(
              color: backgroundColor,
              shape: BoxShape.circle,
            ),
            constraints: const BoxConstraints(minWidth: 16, minHeight: 16),
            child: Center(
              child: Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  height: 1,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
