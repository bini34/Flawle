import 'package:flawle/core/widgets/nav_svg_icon.dart';
import 'package:flawle/features/products/presentation/widgets/bullet_row.dart';
import 'package:flawle/features/products/presentation/widgets/info_accordion.dart';
import 'package:flawle/features/products/presentation/widgets/related_card.dart';
import 'package:flawle/features/products/presentation/widgets/size_chip.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class ProductDetailScreen extends HookConsumerWidget {
  const ProductDetailScreen({super.key, String? productId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pageController = usePageController();
    final currentPage = useState<int>(0);
    final selectedSize = useState<String>('30ml');

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        foregroundColor: Colors.black,
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
     
        actions: [
          IconButton(
            icon: NavSvgIcon('assets/icons/cart.svg'),
            onPressed: () {},
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image carousel
                SizedBox(
                  height: 280,
                  child: PageView.builder(
                    controller: pageController,
                    onPageChanged: (i) => currentPage.value = i,
                    itemCount: 3,
                    itemBuilder: (context, index) => Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: Center(
                          child: Image.network(
                            'https://via.placeholder.com/280x220.png?text=Product+Image',
                            width: 260,
                            height: 220,
                            fit: BoxFit.contain,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                // Dots indicator
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(3, (i) {
                    final active = currentPage.value == i;
                    return AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      width: active ? 8 : 6,
                      height: active ? 8 : 6,
                      decoration: BoxDecoration(
                        color: active ? Colors.black87 : Colors.black26,
                        shape: BoxShape.circle,
                      ),
                    );
                  }),
                ),

                // Product info
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'COSRX',
                        style: TextStyle(
                          color: Colors.black.withValues(alpha: 0.45),
                          letterSpacing: 1.2,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Propolis Light Cream',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      
                    ],
                  ),
                ),

                // Price row
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                  child: const Text(
                        '\$32.00 USD',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                      ),
                ),

                // Size chips
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    children: [
                      SizeChip(
                        label: '30ml',
                        selected: selectedSize.value == '30ml',
                        onTap: () => selectedSize.value = '30ml',
                      ),
                      const SizedBox(width: 10),
                      SizeChip(
                        label: '100ml',
                        selected: selectedSize.value == '100ml',
                        onTap: () => selectedSize.value = '100ml',
                      ),
                    ],
                  ),
                ),

                // Availability bullets
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      BulletRow(icon: Icons.check_circle, color: Colors.green, label: 'In stock'),
                      SizedBox(height: 6),
                      BulletRow(icon: Icons.local_shipping_outlined, color: Colors.black26, label: 'Free delivery'),
                    ],
                  ),
                ),

                // Short description
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: Text(
                    'An exfoliating toner for targeting dullness, texture and signs of aging. Suited to all skin types.',
                    style: TextStyle(
                      fontSize: 14,
                      height: 1.35,
                      color: Colors.black87,
                    ),
                  ),
                ),

                const SizedBox(height: 12),
                // Accordion sections (Description / Ingredients / How to use)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: InfoAccordion(),
                ),

                const SizedBox(height: 24),
                // Related products header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        'Products you may also like',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                      ),
                      Text('See all', style: TextStyle(color: Colors.black45)),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 240,
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    scrollDirection: Axis.horizontal,
                    itemCount: related.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 12),
                    itemBuilder: (context, i) => RelatedCard(product: related[i]),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(
        minimum: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black12),
                borderRadius: BorderRadius.circular(16),
              ),
              child: IconButton(
                icon: const Icon(Icons.favorite_border),
                color: Colors.black,
                onPressed: () {},
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: SizedBox(
                height: 52,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF54D36C),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                  ),
                  onPressed: () {},
                  child: const Text('Add to Cart'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}





// Mock related product model & data







