from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    """Basic pagination class with query parameter control."""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
