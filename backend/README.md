# Flawle Backend — Email OTP Verification

This backend implements a production-ready email verification flow using 6-digit OTPs.

Key features:
- OTP generated on registration; user `is_active=False`, `is_verified=False` until verified
- OTP stored in cache (Redis recommended) for 10 minutes
- Verify endpoint activates account; expired OTP deletes user
- Resend endpoint with 1-minute cooldown and max 3 resends
- Celery Beat task cleans unverified users older than 24 hours

## Endpoints

- `POST /users/register/` — Register user; sends OTP to email
- `POST /users/verify-otp/` — Body: `{ "email": "...", "otp": "123456" }`
	- Success → activates user
	- Expired → deletes user and returns message
- `POST /users/resend-otp/` — Body: `{ "email": "..." }`
	- Max 3 resends; 1-minute cooldown

## Environment

Recommended variables (e.g. `.env`):

```
# Cache (Redis)
CACHE_BACKEND=django_redis.cache.RedisCache
CACHE_LOCATION=redis://redis:6379/1

# Celery
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# Email (use console backend for local dev)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=no-reply@flawle.local

# For SMTP in prod
# EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USE_TLS=true
# EMAIL_HOST_USER=your-user
# EMAIL_HOST_PASSWORD=your-password
```

## Install & Run (local)

```
pip install -r requirements/base.txt

# Migrate DB
python manage.py migrate

# Start server
python manage.py runserver

# Start Celery worker
celery -A config.celery:app worker -l info

# Start Celery Beat (periodic tasks)
celery -A config.celery:app beat -l info
```

## Notes

- Registration does not issue tokens until verification.
- Change OTP TTL and resend limits in `users/services/verification_service.py`.
- Periodic cleanup task: `users.tasks.cleanup_unverified_users` (runs hourly).
