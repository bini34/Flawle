import uuid

from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.utils.text import slugify

from core.models import TimeStampedModel
from products.models.Product import Product


def generate_sku():
    return f"SKU-{uuid.uuid4().hex[:12].upper()}"


class ProductVariant(TimeStampedModel):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
    )

    name = models.CharField(
        max_length=100
    )

    sku = models.CharField(
        max_length=64,
        unique=True,
        default=generate_sku,
        editable=False,
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[
            MinValueValidator(0)
        ],
    )

    currency = models.CharField(
        max_length=3,
        default="ETB",
    )

    stock_qty = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(price__gte=0),
                name="product_variant_price_non_negative",
            ),
            models.UniqueConstraint(
                fields=["product", "name"],
                name="unique_variant_name_per_product",
            ),
        ]

        indexes = [
            models.Index(
                fields=["product", "is_active"]
            ),
        ]

        ordering = ["created_at"]

    def __str__(self):
        return f"{self.product.title} - {self.name}"  