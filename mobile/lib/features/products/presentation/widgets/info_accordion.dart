import 'package:flawle/features/products/presentation/widgets/accordion_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class InfoAccordion extends HookWidget {
  const InfoAccordion({super.key});

  @override
  Widget build(BuildContext context) {
    final openIndex = useState<int?>(null);
    final items = const [
      ('Description', 'Rich, lightweight cream infused with propolis extract to deeply hydrate and soothe.'),
      ('Ingredients', 'Propolis extract, hyaluronic acid, glycerin, panthenol, vitamin E.'),
      ('How to use', 'Apply a pea-sized amount after toner and serum. Use AM/PM.'),
    ];

    return Column(
      children: [
        for (int i = 0; i < items.length; i++)
          AccordionItem(
            title: items[i].$1,
            content: items[i].$2,
            expanded: openIndex.value == i,
            onToggle: () => openIndex.value = openIndex.value == i ? null : i,
          ),
      ],
    );
  }
}