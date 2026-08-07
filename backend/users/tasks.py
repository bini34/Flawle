from datetime import timedelta

from celery import shared_task
from django.utils import timezone

from users.models import User


@shared_task(name="users.cleanup_unverified")
def cleanup_unverified_users():
    cutoff = timezone.now() - timedelta(hours=24)
    qs = User.objects.filter(is_active=False, is_verified=False, date_joined__lt=cutoff)
    deleted, _ = qs.delete()
    return deleted
