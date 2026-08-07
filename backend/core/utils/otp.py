import logging
import random
import time
from typing import Optional

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

_DEF_TIMEOUT_SECONDS = 600  # 10 minutes


def _otp_key(user_id: str) -> str:
    return f"otp:{user_id}"


def _resend_count_key(user_id: str) -> str:
    return f"otp_resend_count:{user_id}"


def _resend_last_ts_key(user_id: str) -> str:
    return f"otp_resend_last_ts:{user_id}"


def generate_otp(length: int = 6) -> str:
    """Generate a numeric OTP of given length."""
    if length < 4 or length > 10:
        length = 6
    return ''.join(random.choices('0123456789', k=length))


def set_otp_for_user(user, otp: str, timeout: int = _DEF_TIMEOUT_SECONDS) -> None:
    """Persist OTP for a user using Django cache with an expiry."""
    key = _otp_key(str(user.id))
    cache.set(key, otp, timeout=timeout)
    logger.debug(f"Stored OTP for user {user.id} with {timeout}s timeout")


def get_otp_for_user(user) -> Optional[str]:
    key = _otp_key(str(user.id))
    return cache.get(key)


def delete_otp_for_user(user) -> None:
    key = _otp_key(str(user.id))
    cache.delete(key)


def get_resend_state(user_id: str) -> tuple[int, Optional[float]]:
    count = cache.get(_resend_count_key(user_id), 0)
    last_ts = cache.get(_resend_last_ts_key(user_id))
    return int(count or 0), float(last_ts) if last_ts is not None else None


def update_resend_state(user_id: str, *, cooldown_seconds: int = 60) -> None:
    count_key = _resend_count_key(user_id)
    last_key = _resend_last_ts_key(user_id)
    count = int(cache.get(count_key, 0)) + 1
    cache.set(count_key, count, timeout=24 * 60 * 60)  # Track for 24h
    cache.set(last_key, time.time(), timeout=cooldown_seconds)


def send_verification_email(email: str, otp: str) -> None:
    """Send the OTP to the user's email. Configure EMAIL_* settings for SMTP."""
    subject = "Your Flawle verification code"
    message = (
        f"Use this code to verify your account: {otp}\n"
        f"It expires in 10 minutes."
    )
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@flawle.local')
    try:
        send_mail(subject, message, from_email, [email], fail_silently=False)
        logger.info(f"Sent OTP email to {email}")
    except Exception as e:  # pragma: no cover
        logger.warning(f"Failed to send email to {email}: {e}. OTP was: {otp}")
