import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CartScreen extends HookWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = useState<List<_CartItem>>([
      const _CartItem(
        title: 'Green Propolis Ampule Mask',
        subtitle: '50pcs',
        price: 50.00,
        qty: 5,
      ),
      const _CartItem(
        title: 'Propolis Light Cream',
        subtitle: '100ml',
        price: 32.00,
        qty: 1,
      ),
      const _CartItem(
        title: 'Real Flawless Luminous\nPerfecting Pressed ...',
        subtitle: 'Translucent',
        price: 48.00,
        qty: 1,
      ),
      const _CartItem(
        title: 'Natural Moisturizing\nFactors + HA',
        subtitle: '',
        price: 24.50,
        qty: 2,
      ),
    ]);

    double total() => items.value.fold(0, (p, e) => p + e.price * e.qty);

    void updateQty(int index, int delta) {
      final list = [...items.value];
      final newQty = (list[index].qty + delta).clamp(0, 99);
      if (newQty == 0) {
        list.removeAt(index);
      } else {
        list[index] = list[index].copyWith(qty: newQty);
      }
      items.value = list;
    }

    void removeAt(int index) {
      final list = [...items.value];
      list.removeAt(index);
      items.value = list;
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        title: const Text(
          'Shopping Cart',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
      ),
      body: SafeArea(
        child: ListView.separated(
          padding: const EdgeInsets.only(bottom: 220, top: 8),
          itemCount: items.value.length,
          separatorBuilder: (_, _) => const Divider(height: 1),
          itemBuilder: (context, index) {
            final item = items.value[index];
            return Dismissible(
              key: ValueKey('cart-$index-${item.title}'),
              direction: DismissDirection.endToStart,
              background: _SwipeDeleteBackground(),
              onDismissed: (_) => removeAt(index),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Thumbnail
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.image, color: Colors.black26),
                    ),
                    const SizedBox(width: 12),
                    // Title and price
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.title,
                            style: const TextStyle(fontWeight: FontWeight.w600),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          if (item.subtitle.isNotEmpty) ...[
                            const SizedBox(height: 4),
                            Text(
                              item.subtitle,
                              style: const TextStyle(
                                color: Colors.black45,
                                fontSize: 12,
                              ),
                            ),
                          ],
                          const SizedBox(height: 6),
                          Row(
                            children: [
                              Text(
                                '\$${item.price.toStringAsFixed(2)} USD',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    // Remove small X and qty controls
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        IconButton(
                          onPressed: () => removeAt(index),
                          splashRadius: 18,
                          icon: const Icon(
                            Icons.close,
                            size: 18,
                            color: Colors.black38,
                          ),
                        ),
                        const SizedBox(height: 2),
                        _QtyPill(
                          qty: item.qty,
                          onMinus: () => updateQty(index, -1),
                          onPlus: () => updateQty(index, 1),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
      bottomNavigationBar: _CartSummary(total: total()),
    );
  }
}

class _QtyPill extends StatelessWidget {
  const _QtyPill({
    required this.qty,
    required this.onMinus,
    required this.onPlus,
  });
  final int qty;
  final VoidCallback onMinus;
  final VoidCallback onPlus;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.black12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _RoundIconButton(icon: Icons.remove, onTap: onMinus),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              qty.toString(),
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
          _RoundIconButton(icon: Icons.add, onTap: onPlus),
        ],
      ),
    );
  }
}

class _RoundIconButton extends StatelessWidget {
  const _RoundIconButton({required this.icon, required this.onTap});
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      customBorder: const CircleBorder(),
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.all(6),
        child: Icon(icon, size: 18),
      ),
    );
  }
}

class _SwipeDeleteBackground extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      alignment: Alignment.centerRight,
      child: Container(
        width: 60,
        height: 84,
        decoration: BoxDecoration(
          color: const Color(0xFFF36A7A),
          borderRadius: BorderRadius.circular(16),
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFF36A7A), Color(0xFFE54574)],
          ),
        ),
        child: const Icon(Icons.delete_outline, color: Colors.white),
      ),
    );
  }
}

class _CartSummary extends StatelessWidget {
  const _CartSummary({required this.total});
  final double total;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.06),
              blurRadius: 12,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Coupon input look
              Container(
                height: 48,
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(24),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: const [
                    Icon(
                      Icons.confirmation_number_outlined,
                      color: Colors.black26,
                    ),
                    SizedBox(width: 8),
                    Text(
                      'Add coupon code',
                      style: TextStyle(color: Colors.black38),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Total:',
                        style: TextStyle(fontWeight: FontWeight.w700),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Order and get 34 points',
                        style: TextStyle(color: Colors.black38, fontSize: 12),
                      ),
                    ],
                  ),
                  const Spacer(),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: const [
                      // total injected below via another Row
                    ],
                  ),
                  Text(
                    '\$${total.toStringAsFixed(2)} USD',
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                ],
              ),
              const SizedBox(height: 2),
              const Align(
                alignment: Alignment.centerRight,
                child: Text(
                  'Free shipping',
                  style: TextStyle(color: Colors.black38, fontSize: 12),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 52,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  onPressed: () {},
                  child: const Text(
                    'Proceed to Checkout',
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CartItem {
  const _CartItem({
    required this.title,
    required this.subtitle,
    required this.price,
    required this.qty,
  });
  final String title;
  final String subtitle;
  final double price;
  final int qty;

  _CartItem copyWith({
    String? title,
    String? subtitle,
    double? price,
    int? qty,
  }) => _CartItem(
    title: title ?? this.title,
    subtitle: subtitle ?? this.subtitle,
    price: price ?? this.price,
    qty: qty ?? this.qty,
  );
}
