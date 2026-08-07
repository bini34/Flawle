# yourapp/middleware.py
from django.http import JsonResponse
import json

class JsonErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # If it's an HTML error page (common for 400/403/404/500)
        if (response.status_code >= 400 and 
            'text/html' in response.get('Content-Type', '')):
            
            # Extract error message from HTML (simple regex or str find)
            content = response.content.decode('utf-8')
            error_msg = "Server error occurred"  # Default
            
            # Quick parse for common Django error texts
            if "Bad Request" in content:
                error_msg = "Bad Request (400)"
            elif "Page not found" in content:
                error_msg = "Not Found (404)"
            elif "CSRF verification failed" in content:
                error_msg = "CSRF token missing or incorrect"
            # Add more patterns as needed
            
            # Return JSON instead
            return JsonResponse({
                'error': error_msg,
                'status_code': response.status_code
            }, status=response.status_code)
        
        return response