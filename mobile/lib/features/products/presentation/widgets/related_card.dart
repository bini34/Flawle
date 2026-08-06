import 'package:flutter/material.dart';


class RelProduct {
  const RelProduct({required this.title, required this.brand, required this.price, this.limited = false, this.fav = false});
  final String title;
  final String brand;
  final double price;
  final bool limited;
  final bool fav;
}
const related = <RelProduct>[
  RelProduct(title: 'Glycolic Acid 7% Toning', brand: 'The Ordinary', price: 14.50, limited: true),
  RelProduct(title: 'Glycolic Acid 7% Toning', brand: 'The Ordinary', price: 14.50, fav: true),
  RelProduct(title: 'Vitamin C Serum 15%', brand: 'Murad', price: 32.00),
];

class RelatedCard extends StatelessWidget {
  const RelatedCard({super.key, required this.product});
  final RelProduct product;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                if (product.limited)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.black,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text(
                      'LIMITED EDITION',
                      style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w600),
                    ),
                  ),
                const Spacer(),
                Icon(product.fav ? Icons.favorite : Icons.favorite_border, size: 18, color: product.fav ? Colors.green : Colors.black),
              ],
            ),
            const SizedBox(height: 8),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey.shade200,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(
                  child: Icon(Icons.image, color: Colors.black26, size: 36),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Text(
              product.brand,
              style: const TextStyle(fontSize: 12, color: Colors.black54),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 2),
            Text(
              product.title,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Text(
                  '\$${product.price.toStringAsFixed(2)} USD',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                const Spacer(),
                Material(
                  color: Colors.black,
                  shape: const CircleBorder(),
                  child: InkWell(
                    customBorder: const CircleBorder(),
                    onTap: () {},
                    child: const Padding(
                      padding: EdgeInsets.all(6),
                      child: Icon(Icons.add, color: Colors.white, size: 18),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}


