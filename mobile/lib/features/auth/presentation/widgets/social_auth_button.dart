import 'package:flutter/material.dart';

class SocialAuthButton extends StatelessWidget {
  const SocialAuthButton({super.key, required this.icon});
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
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