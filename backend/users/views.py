from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, RegisterSerializer, LogoutSerializer
from .models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(email=response.data['email'])
        return Response({
            "message": "User registered successfully.",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
                "is_verified": user.is_verified,
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password required"}, status=400)

        user = authenticate(email=email, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        # Block login if not verified (optional later)
        # if not user.is_verified:
        #     return Response({"error": "Please verify your email first"}, status=403)

        refresh = RefreshToken.for_user(user)

        response = Response({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
                "is_verified": user.is_verified
            }
        })

        response.set_cookie('access', str(refresh.access_token), httponly=True, secure=True, samesite='Lax', max_age=3600)
        response.set_cookie('refresh', str(refresh), httponly=True, secure=True, samesite='Lax', max_age=604800)
        response.set_cookie('csrf', get_token(request), secure=True, samesite='Lax')

        return response
    
class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=400)
            
            token = RefreshToken(refresh_token)
            token.blacklist()  # ← Invalidates the token forever
            
            response = Response({"message": "Logged out successfully"})
            response.delete_cookie('access')
            response.delete_cookie('refresh')
            response.delete_cookie('csrf')
            return response
        except Exception as e:
            return Response({"error": "Invalid token"}, status=400)