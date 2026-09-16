from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('verify-otp/', views.VerifyOTPView.as_view(), name='verify-otp'),
    path('resend-otp/', views.ResendOTPView.as_view(), name='resend-otp'),
    path('me/', views.UserProfileView.as_view(), name='user-profile'),
    path('request-password-reset/', views.RequestPasswordResetView.as_view(), name='request-password-reset'),
    path('verify-reset-otp/', views.VerifyResetOTPView.as_view(), name='verify-reset-otp'),
    path('set-new-password/', views.SetNewPasswordView.as_view(), name='set-new-password'),
]