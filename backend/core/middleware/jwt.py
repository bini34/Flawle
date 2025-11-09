from django.utils.deprecation import MiddlewareMixin


class JWTAuthenticationMiddleware(MiddlewareMixin):
    """Placeholder middleware for attaching JWT-authenticated user to request.

    Real implementation should validate tokens and set request.user accordingly.
    For now it simply passes through to the next middleware/view.
    """

    def process_request(self, request):
        return None
