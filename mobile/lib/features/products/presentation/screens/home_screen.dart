import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flawle/features/auth/presentation/provider/auth_provider.dart';
import 'package:flawle/features/products/domain/entities/product.dart';
import 'package:flawle/features/products/presentation/widgets/product_card.dart';
import 'package:flawle/features/products/presentation/widgets/promo_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flawle/features/auth/presentation/provider/state/auth_state.dart';


// Placeholder data until products are loaded from the backend.
const _sampleProducts = <Product>[
  Product(
    id: '1',
    brand: 'COSRX',
    title: 'Lip Sleep Propolis Lip Mask',
    shortDescription: 'Overnight nourishing lip mask.',
    description: 'A nourishing lip mask enriched with propolis extract.',
    ingredients: 'Propolis Extract, Shea Butter, Beeswax',
    usage: 'Apply a thin layer before sleep.',
    imageUrls: [],
    variants: ['20g'],
    price: 30,
    isFavorite: false,
  ),
  Product(
    id: '2',
    brand: 'COSRX',
    title: 'Propolis Light Cream',
    shortDescription: 'Lightweight moisturizing cream.',
    description: 'A light cream that hydrates and soothes the skin.',
    ingredients: 'Propolis Extract, Hyaluronic Acid',
    usage: 'Apply morning and night after serum.',
    imageUrls: [],
    variants: ['50ml'],
    price: 32,
    isFavorite: false,
  ),
  Product(
    id: '3',
    brand: 'CNP Laboratory',
    title: 'Green Propolis Ampule',
    shortDescription: 'Concentrated green propolis ampule.',
    description: 'An ampule that energizes dull and tired skin.',
    ingredients: 'Green Propolis Extract, Niacinamide',
    usage: 'Apply 2-3 drops after cleansing.',
    imageUrls: [],
    variants: ['15ml', '30ml'],
    price: 50,
    isFavorite: true,
    limited: true,
  ),
  Product(
    id: '4',
    brand: 'Benton',
    title: 'Snail Bee High Content Mask',
    shortDescription: 'Soothing sheet mask.',
    description: 'A sheet mask with snail secretion filtrate and bee venom.',
    ingredients: 'Snail Secretion Filtrate, Bee Venom',
    usage: 'Leave on for 15-20 minutes.',
    imageUrls: [],
    variants: ['1 sheet'],
    price: 40,
    isFavorite: false,
  ),
  Product(
    id: '5',
    brand: 'Some By Mi',
    title: 'Propolis Energy Ampule',
    shortDescription: 'Energizing daily ampule.',
    description: 'A daily ampule that strengthens the skin barrier.',
    ingredients: 'Propolis Extract, Centella Asiatica',
    usage: 'Use daily after toner.',
    imageUrls: [],
    variants: ['30ml'],
    price: 35,
    isFavorite: false,
    limited: true,
  ),
];

class HomeScreen extends HookConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categories = ['Fragrance', 'Makeup', 'Hair', 'Skincare', 'Body'];
    final selectedCategory = useState<String?>(null);

   
    final pageController = usePageController(viewportFraction: 0.9);
    final state = ref.watch(authProvider);
    final user = state.maybeWhen(success: (u) => u, orElse: () => null);

    /// Clean fullName logic
    String name = <String?>[
      user?.firstName?.trim(),
    ].whereType<String>().where((name) => name.isNotEmpty).join(' ');

    if (name.isEmpty) name = 'Guest ';
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Welcome back 👋,',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.black54,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            name,
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Material(
                      shape: const CircleBorder(),
                      child: InkWell(
                        customBorder: const CircleBorder(),
                        onTap: () {},
                        child: const Padding(
                          padding: EdgeInsets.all(12),
                          child: Icon(Icons.search, color: Colors.black),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Promo slider
            SliverToBoxAdapter(
              child: SizedBox(
                height: 170,
                child: PageView.builder(
                  controller: pageController,
                  itemCount: 3,
                  itemBuilder: (context, index) => PromoCard(index: index),
                ),
              ),
            ),

            // Categories title
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:  [
                    Text(
                      'Categories',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                     TextButton(
                      onPressed: () => context.goNamed(RouteNames.catalog),
                      child: Text('See all', style: TextStyle(color: Colors.black45)),
                    ),
                  ],
                ),
              ),
            ),

            // Categories list
            SliverToBoxAdapter(
              child: SizedBox(
                height: 42,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: categories.length,
                  separatorBuilder: (_, _) => const SizedBox(width: 8),
                  itemBuilder: (context, i) {
                    final c = categories[i];
                    final selected = selectedCategory.value == c;

                    return ChoiceChip(
                      label: Text(c),
                      selected: selected,
                      onSelected: (_) =>
                          selectedCategory.value = selected ? null : c,
                      labelStyle: TextStyle(
                        color: selected ? Colors.white : Colors.black87,
                        fontWeight: FontWeight.w600,
                      ),
                      selectedColor: Colors.black,
                      backgroundColor: Colors.grey.shade200,
                      shape: StadiumBorder(
                        side: BorderSide(
                          color: selected ? Colors.black : Colors.transparent,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // New arrivals title
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:  [
                    Text(
                      'New arrivals',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    TextButton(
                      onPressed: () => context.goNamed(RouteNames.catalog),
                      
                      child: Text('See all', style: TextStyle(color: Colors.black45)),
                     
                    ),
                  ],
                ),
              ),
            ),

            // Product list
            SliverToBoxAdapter(
              child: SizedBox(
                height: 250,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: _sampleProducts.length,
                  separatorBuilder: (_, _) => const SizedBox(width: 12),
                  itemBuilder: (context, i) =>
                      ProductCard(product: _sampleProducts[i], id: i),
                ),
              ),
            ),
              SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:  [
                    Text(
                      'New arrivals',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    TextButton(
                      onPressed: () => context.goNamed(RouteNames.catalog),
                      
                      child: Text('See all', style: TextStyle(color: Colors.black45)),
                     
                    ),
                  ],
                ),
              ),
            ),

            // Product list
            SliverToBoxAdapter(
              child: SizedBox(
                height: 250,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: _sampleProducts.length,
                  separatorBuilder: (_, _) => const SizedBox(width: 12),
                  itemBuilder: (context, i) =>
                      ProductCard(product: _sampleProducts[i], id: i),
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 24)),
          ],
        ),
      ),
    );
  }
}



