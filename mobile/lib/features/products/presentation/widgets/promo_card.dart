import 'package:flutter/material.dart';

class PromoCard extends StatelessWidget {
  const PromoCard({super.key, required this.index});
  final int index;

  @override
  Widget build(BuildContext context) {
    final colors = [
      const Color(0xFFB9EBC1),
      const Color(0xFFCFE5FF),
      const Color(0xFFFFE3C7),
    ];

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Container(
        decoration: BoxDecoration(
          color: colors[index % colors.length],
          borderRadius: BorderRadius.circular(18),
        ),
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            // Text content
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Retinol Youth Renewal\nNight Cream',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      elevation: 0,
                    ),
                    onPressed: () {},
                    child: const Text('20% OFF | BUY NOW'),
                  ),
                ],
              ),
            ),

            const SizedBox(width: 12),

            // Image placeholder
            Container(
              width: 110,
              height: 110,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.7),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(Icons.image, size: 40, color: Colors.black26),
            ),
          ],
        ),
      ),
    );
  }
}
