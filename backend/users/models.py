# users/models.py
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

# ──────────────────────────────────────────────────────────────
# 1. Role Choices
# ──────────────────────────────────────────────────────────────
class UserRole(models.TextChoices):
    USER = 'USER', 'User'
    ADMIN = 'ADMIN', 'Admin'
    STAFF = 'STAFF', 'Staff'


# ──────────────────────────────────────────────────────────────
# 2. Custom User Manager 
# ──────────────────────────────────────────────────────────────
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not phone:
            raise ValueError('The Phone field must be set')
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', UserRole.ADMIN)
        extra_fields.setdefault('is_verified', True)

        return self.create_user(email, first_name, last_name, phone, password, **extra_fields)


# ──────────────────────────────────────────────────────────────
# 3. User Model 
# ──────────────────────────────────────────────────────────────
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None  # we don't use username

    email = models.EmailField(unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)

    role = models.CharField(
        max_length=10,
        choices=UserRole.choices,
        default=UserRole.USER,
    )

    phone_regex = RegexValidator(
        regex=r'^0\d{9}$',
        message="Phone number must be 10 digits starting with 0 (e.g. 0912345678)."
    )
    phone = models.CharField(
        validators=[phone_regex],
        max_length=10,
        blank=False,
        null=False,
        unique=True
    )

    # Removed address → moved to Profile
    is_verified = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_staff_user(self):
        return self.role == UserRole.STAFF

    @property
    def is_user(self):
        return self.role == UserRole.USER

    @property
    def is_admin_user(self):
        return self.role == UserRole.ADMIN


# ──────────────────────────────────────────────────────────────
# 4. Profile Model (Addis Ababa delivery address)
# ──────────────────────────────────────────────────────────────

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    # Personal info
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
    )

    # Addis Ababa single delivery address
    address = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

    def __str__(self):
        return f"{self.user.full_name} - Profile"

    


# ──────────────────────────────────────────────────────────────
# 5. Signals: Auto-create & auto-save Profile
# ──────────────────────────────────────────────────────────────
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()