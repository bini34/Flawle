import uuid

from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.utils.text import slugify

from core.models import TimeStampedModel
from products.Models.Product import Product






 






class ProductImage(TimeStampedModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image_url = models.URLField()

    public_id = models.CharField(
        max_length=255,
        blank=True,
    )

    alt_text = models.CharField(
        max_length=255,
        blank=True,
    )

    position = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "position"],
                name="unique_product_image_position",
            )
        ]

        ordering = [
            "position",
            "created_at",
        ]

    def __str__(self):
        return (
            f"{self.product.title} "
            f"image {self.position}"
        )        
