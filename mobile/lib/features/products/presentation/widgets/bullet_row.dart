import 'package:flutter/material.dart';

class BulletRow extends StatelessWidget {
  const BulletRow({super.key, required this.icon, required this.color, required this.label});
  final IconData icon;
  final Color color;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 18, color: color),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            label,
            style: TextStyle(
              color: color == Colors.green ? Colors.green : Colors.black45,
              fontSize: 14,
            ),
          ),
        ),
      ],
    );
  }
}