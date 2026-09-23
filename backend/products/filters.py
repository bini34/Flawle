import django_filters
from products.Models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="variants__price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="variants__price", lookup_expr='lte')
    in_stock = django_filters.BooleanFilter(method="filter_in_stock")

    class Meta:
        model = Product
        fields = ["brand", 'category', 'status'] 


    def filter_min_price(self, queryset, name, value):
        return queryset.filter(
            starting_price__gte=value
        )
    
    def filter_max_price(self, queryset, name, value):
        return queryset.filter(
            starting_price__lte=value
        )
    
    def filter_in_stock(self, queryset, name, value):
       if value is None:
           return queryset
       return queryset.filter(in_stock = value) 