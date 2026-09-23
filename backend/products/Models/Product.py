import uuid
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from core.models import TimeStampedModel
from products.Models import Category
from products.Models.Brand import Brand

class Product(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        INACTIVE = "inactive", "Inactive"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    title = models.CharField(
        max_length=255
    )

    slug = models.SlugField(
        max_length=255
    )

    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name="products",
        null=True,
        blank=True,
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    short_description = models.TextField(
        blank=True
    )

    description = models.TextField(
        blank=True
    )
    
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["category", "slug"],
                name="unique_product_slug_per_category",
            )
        ]

        indexes = [
            models.Index(
                fields=["status"]
            ),
            models.Index(
                fields=["category", "status"]
            ),
        ]

        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        if (
            self.status == self.Status.ACTIVE
            and self.published_at is None
        ):
            self.published_at = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title