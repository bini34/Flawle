import 'package:flutter_riverpod/flutter_riverpod.dart';

// Static suggestions sample; replace with backend call later.
const _allSuggestions = <String>[
  'propolis',
  'propolis cream',
  'propolis b5',
  'propolis ampule mask',
  'propolis serum',
  'propolis lip sleeping mask',
  'propolis cosrx',
  'propolis some by mi',
  'protein powder',
  'probiotic',
];

class ProductSearchState {
  final String query;
  final List<String> suggestions;
  const ProductSearchState({this.query = '', this.suggestions = const []});

  ProductSearchState copyWith({String? query, List<String>? suggestions}) =>
      ProductSearchState(
        query: query ?? this.query,
        suggestions: suggestions ?? this.suggestions,
      );
}

class ProductSearchNotifier extends Notifier<ProductSearchState> {
  @override
  ProductSearchState build() => const ProductSearchState();

  void setQuery(String value) {
    final q = value.trim();
    final sug = q.isEmpty
        ? const <String>[]
        : _allSuggestions
              .where((s) => s.toLowerCase().startsWith(q.toLowerCase()))
              .take(10)
              .toList();
    state = state.copyWith(query: value, suggestions: sug);
  }

  void selectSuggestion(String suggestion) => setQuery(suggestion);
}

final productSearchProvider =
    NotifierProvider<ProductSearchNotifier, ProductSearchState>(
      ProductSearchNotifier.new,
    );
