import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../provider/product_search_provider.dart';

class ProductSearchResultPage extends ConsumerWidget {
  const ProductSearchResultPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // theme reserved for future style adjustments
    final searchState = ref.watch(productSearchProvider);
    final query = searchState.query.trim();
    final products = _sampleProducts; // Replace with backend results.

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        titleSpacing: 0,
        elevation: 0,
        title: _SearchBar(
          initial: query,
          onChanged: (v) =>
              ref.read(productSearchProvider.notifier).setQuery(v),
        ),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.tune_rounded)),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 44,
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              scrollDirection: Axis.horizontal,
              children: [
                _FilterChip(label: 'All filters'),
                _FilterChip(label: 'Category'),
                _FilterChip(label: 'Brand', trailingCount: 3),
                _FilterChip(label: 'Price'),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 8, 16, 4),
            child: Text(
              'Best match',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
              itemCount: products.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 0.63,
              ),
              itemBuilder: (context, i) => _ProductCard(product: products[i]),
            ),
          ),
        ],
      ),
    );
  }
}

class _SearchBar extends StatelessWidget {
  const _SearchBar({required this.initial, required this.onChanged});
  final String initial;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final controller = TextEditingController(text: initial)
      ..selection = TextSelection.collapsed(offset: initial.length);
    return Container(
      height: 40,
      margin: const EdgeInsets.only(right: 4),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      alignment: Alignment.center,
      child: TextField(
        controller: controller,
        onChanged: onChanged,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.search_rounded, size: 20),
          hintText: 'Search',
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 4,
            vertical: 0,
          ),
          suffixIcon: controller.text.isEmpty
              ? null
              : IconButton(
                  icon: const Icon(Icons.close_rounded, size: 18),
                  onPressed: () {
                    controller.clear();
                    onChanged('');
                  },
                ),
        ),
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({required this.label, this.trailingCount});
  final String label;
  final int? trailingCount;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 8, top: 4, bottom: 4),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
          ),
          if (trailingCount != null) ...[
            const SizedBox(width: 6),
            CircleAvatar(
              radius: 10,
              backgroundColor: Colors.black,
              child: Text(
                trailingCount.toString(),
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  const _ProductCard({required this.product});
  final _Product product;

  @override
  Widget build(BuildContext context) {
    // (theme removed; not used currently)
    return Material(
      color: Colors.white,
      elevation: 0,
      child: InkWell(
        onTap: () {},
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.shade300),
          ),
          padding: const EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          color: Colors.grey.shade200,
                          child: Image.network(
                            product.imageUrl,
                            fit: BoxFit.cover,
                            errorBuilder: (_, _, _) =>
                                const Icon(Icons.image_not_supported_outlined),
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      top: 4,
                      right: 4,
                      child: GestureDetector(
                        onTap: () {},
                        child: CircleAvatar(
                          radius: 16,
                          backgroundColor: Colors.white,
                          child: Icon(
                            product.isFavorite
                                ? Icons.favorite
                                : Icons.favorite_border,
                            size: 18,
                            color: product.isFavorite
                                ? Colors.redAccent
                                : Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    if (product.badge != null)
                      Positioned(
                        left: 4,
                        top: 4,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            product.badge!,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              Text(
                product.brand,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Colors.black54,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                product.name,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Text(
                    '\$${product.price.toStringAsFixed(2)} USD',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Spacer(),
                  InkWell(
                    onTap: () {},
                    child: CircleAvatar(
                      radius: 16,
                      backgroundColor: Colors.black,
                      child: const Icon(
                        Icons.add,
                        color: Colors.white,
                        size: 18,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Product {
  final String id;
  final String name;
  final String brand;
  final double price;
  final String imageUrl;
  final String? badge;
  final bool isFavorite;
  const _Product({
    required this.id,
    required this.name,
    required this.brand,
    required this.price,
    required this.imageUrl,
    this.badge,
    this.isFavorite = false,
  });
}

const _sampleProducts = <_Product>[
  _Product(
    id: '1',
    name: 'Lip Sleep Propolis Lip Mask',
    brand: 'COSRX',
    price: 30,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Propolis+Lip',
    isFavorite: false,
  ),
  _Product(
    id: '2',
    name: 'Propolis Light Cream',
    brand: 'COSRX',
    price: 32,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Propolis+Cream',
    isFavorite: false,
  ),
  _Product(
    id: '3',
    name: 'Green Propolis Ampule',
    brand: 'CNP Laboratory',
    price: 50,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Ampule',
    badge: 'LIMITED EDITION',
    isFavorite: true,
  ),
  _Product(
    id: '4',
    name: 'Snail Bee High Content Mask',
    brand: 'Benton',
    price: 40,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Mask',
    isFavorite: false,
  ),
  _Product(
    id: '5',
    name: 'Propolis B5 Serum',
    brand: 'COSRX',
    price: 28,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Propolis+B5',
    badge: 'LIMITED EDITION',
    isFavorite: false,
  ),
  _Product(
    id: '6',
    name: 'Propolis Energy Ampule',
    brand: 'Some By Mi',
    price: 35,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Energy+Ampule',
    isFavorite: false,
  ),
];
