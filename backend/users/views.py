from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.services.verification_service import VerificationService

from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    LogoutSerializer,
    SetNewPasswordSerializer,
    UserProfileSerializer,
    VerifyResetOTPSerializer,
    verifyOTPSerializer,
    ResendOTPSerializer,
)
from .models import User
import logging
logger = logging.getLogger(__name__)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        logger.info(f"New user registered: {user}")
        response = Response({
            "message": "User registered. OTP sent to email.",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone": user.phone,
                "role": user.role,
                "is_verified": user.is_verified,
            }
        }, status=status.HTTP_201_CREATED)
        return response


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
        if not user.is_verified:
             return Response({"error": "Please verify your email first"}, status=403)

        refresh = RefreshToken.for_user(user)

        response = Response({
            "message": "Login successful",           
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


class VerifyOTPView(generics.GenericAPIView):
    serializer_class = verifyOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            "message": "Email verified successfully."
                   }, status=status.HTTP_200_OK)


class ResendOTPView(generics.GenericAPIView):
    serializer_class = ResendOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "OTP resent if eligible"}, status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer  # Reuse the UserProfileSerializer for user profile
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user    


class RequestPasswordResetView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', '').strip().lower()
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        result = VerificationService.request_password_reset(email)
        if not result.success:
            return Response({"error": result.message}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Password reset OTP sent if eligible"}, status=status.HTTP_200_OK)

class VerifyResetOTPView(generics.GenericAPIView):
    serializer_class = VerifyResetOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset OTP verified successfully."}, status=status.HTTP_200_OK)

class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)    