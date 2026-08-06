import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flawle/core/configs/router-config/route_names.dart';
import '../provider/product_search_provider.dart';

// Suggestions handled by productSearchProvider; local list removed.

// Inline providers removed; using unified productSearchProvider.

class ProductSearchScreen extends ConsumerWidget {
  const ProductSearchScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final searchState = ref.watch(productSearchProvider);
    final query = searchState.query;
    final suggestions = searchState.suggestions;

    void setQuery(String v) =>
        ref.read(productSearchProvider.notifier).setQuery(v);

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Top search bar with back + text input + clear
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 4, 8, 0),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(
                      Icons.arrow_back_ios_new_rounded,
                      size: 20,
                    ),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  Expanded(
                    child: Container(
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      alignment: Alignment.center,
                      child: TextField(
                        autofocus: true,
                        onChanged: setQuery,
                        controller: TextEditingController(text: query)
                          ..selection = TextSelection.collapsed(
                            offset: query.length,
                          ),
                        onSubmitted: (value) {
                          final q = value.trim();
                          if (q.isNotEmpty) {
                            context.pushNamed(RouteNames.productSearchResults);
                          }
                        },
                        decoration: InputDecoration(
                          hintText: 'Search products',
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 0,
                          ),
                          suffixIcon: query.isEmpty
                              ? null
                              : IconButton(
                                  icon: const Icon(
                                    Icons.close_rounded,
                                    size: 18,
                                  ),
                                  splashRadius: 18,
                                  onPressed: () => setQuery(''),
                                ),
                        ),
                        style: theme.textTheme.bodyMedium,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Suggestions list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                itemCount: suggestions.length,
                itemBuilder: (context, i) {
                  final suggestion = suggestions[i];
                  return InkWell(
                    onTap: () => ref
                        .read(productSearchProvider.notifier)
                        .selectSuggestion(suggestion),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: _HighlightedSuggestion(
                        suggestion: suggestion,
                        query: query,
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HighlightedSuggestion extends StatelessWidget {
  const _HighlightedSuggestion({required this.suggestion, required this.query});
  final String suggestion;
  final String query;

  @override
  Widget build(BuildContext context) {
    final lower = suggestion.toLowerCase();
    final q = query.trim().toLowerCase();
    if (q.isEmpty || !lower.startsWith(q)) {
      return Text(suggestion, style: const TextStyle(fontSize: 15));
    }
    final highlight = suggestion.substring(0, q.length);
    final rest = suggestion.substring(q.length);
    return RichText(
      text: TextSpan(
        style: const TextStyle(color: Colors.black87, fontSize: 15),
        children: [
          TextSpan(
            text: highlight,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
          TextSpan(text: rest),
        ],
      ),
    );
  }
}
