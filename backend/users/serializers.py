from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from users.services.verification_service import VerificationService
from .models import User
from users.services.verification_service import VerificationService

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'phone', 'password')
        extra_kwargs = {'password': {'write_only': True}}
   

    def create(self, validated_data):
        # Delegate to service for side effects (OTP + email)
        return VerificationService.register_user(validated_data)
        

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
   
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user,
            }
        raise serializers.ValidationError("Invalid credentials")
    
class verifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6, min_length=6)

    def validate(self, data):
        email = data['email'].lower()
        otp_input = data['otp'].strip()

        try:
            user = User.objects.get(email=email, is_verified=False, is_active=False)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or already verified")

        result = VerificationService.verify_otp(email, otp_input)
        if not result.success:
            raise serializers.ValidationError(result.message)
        data['user'] = result.payload['user']
        return data


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        email = data['email'].lower()
        result = VerificationService.resend_otp(email)
        if not result.success:
            raise serializers.ValidationError(result.message)
        return data

class LogoutSerializer(serializers.Serializer):
       refresh = serializers.CharField(help_text="Refresh token to blacklist")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id", "email", "first_name", "last_name",
            "phone", "role", "is_verified",
        )
        read_only_fields = fields

class VerifyResetOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6, min_length=6)

    def validate(self, data):
        email = data['email'].lower()
        otp_input = data['otp'].strip()

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email")

        result = VerificationService.verify_reset_otp(user, otp_input)
        if not result.success:
            raise serializers.ValidationError(result.message)
        data['user'] = result.payload['user']
        return data


class SetNewPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    def validate(self, data):
        email = data['email'].lower()
        new_password = data['new_password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email")

        # Here you can add additional checks if needed (e.g., if the user has verified the OTP)
        user.set_password(new_password)
        user.save()
        return data    