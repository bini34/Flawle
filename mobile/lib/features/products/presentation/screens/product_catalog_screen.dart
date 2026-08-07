import 'package:flawle/core/configs/router-config/route_names.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';

class ProductCatalogScreen extends HookWidget {
  const ProductCatalogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final selectedTab = useState<int>(
      1,
    ); // 0 = Categories, 1 = Brands (default to Brands)

    const categoriesMap = <String, List<String>>{
      'Skincare': [
        'Cleansers',
        'Moisturizers',
        'Serums',
        'Face Masks',
        'Eye Care',
      ],
      'Makeup': ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara', 'Blush'],
      'Hair': ['Shampoo', 'Conditioner', 'Treatments', 'Styling'],
    };

    const brands = <String>[
      // A
      'Anastasia Beverly Hills',
      'Armani Beauty',
      'Ardell',
      'Aveeno',
      'Aveda',
      // B
      'Benefit Cosmetics',
      'Bobbi Brown',
      "Burt's Bees",
      'Bvlgari',
      // C
      'Chanel',
      'Clarins',
      'Clinique',
      // a few from earlier dataset
      'CeraVe',
      'La Roche-Posay',
      'Murad',
      'The Inkey List',
      'The Ordinary',
      'Vichy',
    ];

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Title row with centered title and search button on the right
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                child: SizedBox(
                  height: 44,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      const Align(
                        alignment: Alignment.center,
                        child: Text(
                          'Browse Products',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: Container(
                          width: 36,
                          height: 36,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                          ),
                          child: IconButton(
                            padding: EdgeInsets.zero,
                            icon: const Icon(Icons.search, size: 20),
                            onPressed: () {
                              context.pushNamed(RouteNames.productSearch);
                            },
                            color: Colors.black87,
                            tooltip: 'Search',
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Segmented control (Categories / Brands)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: _SegmentedControl(
                  segments: const ['Categories', 'Brands'],
                  selectedIndex: selectedTab.value,
                  onChanged: (i) => selectedTab.value = i,
                ),
              ),
            ),

            // Content
            if (selectedTab.value == 0)
              SliverList(
                delegate: SliverChildListDelegate([
                  const SizedBox(height: 12),
                  for (final entry in categoriesMap.entries) ...[
                    _SectionHeader(title: entry.key),
                    for (final item in entry.value) _SubItem(label: item),
                    const Divider(height: 24),
                  ],
                  const SizedBox(height: 8),
                ]),
              )
            else
              SliverList(
                delegate: SliverChildListDelegate([
                  const SizedBox(height: 12),
                  ...(() {
                    // Group brands by initial letter
                    final grouped = <String, List<String>>{};
                    for (final b in brands) {
                      if (b.isEmpty) continue;
                      final key = b[0].toUpperCase();
                      grouped.putIfAbsent(key, () => <String>[]).add(b);
                    }
                    final letters = grouped.keys.toList()..sort();
                    final children = <Widget>[];
                    for (final letter in letters) {
                      final names = [...grouped[letter]!]..sort();
                      children.add(_AlphaHeader(letter: letter));
                      for (final n in names) {
                        children.add(_SubItem(label: n));
                      }
                      children.add(const Divider(height: 24));
                    }
                    return children;
                  })(),
                  const SizedBox(height: 8),
                ]),
              ),
          ],
        ),
      ),
    );
  }
}

class _SegmentedControl extends StatelessWidget {
  const _SegmentedControl({
    required this.segments,
    required this.selectedIndex,
    required this.onChanged,
  });

  final List<String> segments;
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        children: [
          for (int i = 0; i < segments.length; i++)
            Expanded(
              child: GestureDetector(
                onTap: () => onChanged(i),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeInOut,
                  decoration: BoxDecoration(
                    color: i == selectedIndex
                        ? Colors.black
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    segments[i],
                    style: TextStyle(
                      color: i == selectedIndex ? Colors.white : Colors.black87,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: Colors.black,
        ),
      ),
    );
  }
}

class _SubItem extends StatelessWidget {
  const _SubItem({required this.label});
  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 15,
          color: Colors.black45,
          height: 1.25,
        ),
      ),
    );
  }
}

class _AlphaHeader extends StatelessWidget {
  const _AlphaHeader({required this.letter});
  final String letter;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(
        letter,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w700,
          color: Colors.black,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
