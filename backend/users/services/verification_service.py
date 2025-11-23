import time
from dataclasses import dataclass
from typing import Dict, Any
from django.core.cache import cache
from django.db import transaction
from django.utils import timezone

from core.utils.otp import (
    generate_otp,
    set_otp_for_user,
    get_otp_for_user,
    delete_otp_for_user,
    send_verification_email,
    get_resend_state,
    update_resend_state,
)
from users.models import User

OTP_TTL_SECONDS = 600  # 10 minutes
RESEND_MAX = 3
RESEND_COOLDOWN_SECONDS = 60


@dataclass
class VerificationResult:
    success: bool
    message: str
    payload: Dict[str, Any] | None = None


class VerificationService:
    @staticmethod
    @transaction.atomic
    def register_user(data: Dict[str, Any]) -> User:
        user = User.objects.create(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data['phone'],
            is_active=False,
            is_verified=False,
        )
        user.set_password(data['password'])
        user.save()

        otp = generate_otp()
        set_otp_for_user(user, otp, timeout=OTP_TTL_SECONDS)
        send_verification_email(user.email, otp)
        return user

    @staticmethod
    @transaction.atomic
    def verify_otp(email: str, otp: str) -> VerificationResult:
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return VerificationResult(False, "Invalid email")

        if user.is_verified:
            return VerificationResult(True, "Already verified", payload={"user": user})

        stored = get_otp_for_user(user)
        if not stored:
            # OTP expired → delete user immediately
            user.delete()
            return VerificationResult(False, "OTP expired, register again")

        if otp != stored:
            return VerificationResult(False, "Invalid OTP")

        # Success
        delete_otp_for_user(user)
        user.is_verified = True
        user.is_active = True
        user.save(update_fields=["is_verified", "is_active"]) 
        return VerificationResult(True, "Email verified", payload={"user": user})

    @staticmethod
    def resend_otp(email: str) -> VerificationResult:
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return VerificationResult(False, "Invalid email")

        if user.is_verified:
            return VerificationResult(False, "User already verified")

        user_id = str(user.id)
        count, last_ts = get_resend_state(user_id)

        if count >= RESEND_MAX:
            return VerificationResult(False, "Resend limit reached. Try later or register again.")

        now = time.time()
        if last_ts is not None and (now - last_ts) < RESEND_COOLDOWN_SECONDS:
            return VerificationResult(False, "Wait 1 minute before requesting another OTP")

        otp = generate_otp()
        set_otp_for_user(user, otp, timeout=OTP_TTL_SECONDS)
        send_verification_email(user.email, otp)
        update_resend_state(user_id, cooldown_seconds=RESEND_COOLDOWN_SECONDS)
        return VerificationResult(True, "OTP resent")
