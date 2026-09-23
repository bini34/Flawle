import uuid

from django.db import models
from core.models import TimeStampedModel
from products.Models.Product import Product


class ProductDetail(TimeStampedModel):
    class Type(models.TextChoices):
        DESCRIPTION = "description", "Description"
        INGREDIENTS = "ingredients", "Ingredients"
        HOW_TO_USE = "how_to_use", "How to use"
        BENEFITS = "benefits", "Benefits"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="details",
    )

    type = models.CharField(
        max_length=20,
        choices=Type.choices,
    )

    content = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "type"],
                name="unique_product_detail_type",
            )
        ]

        ordering = [
            "type",
            "created_at",
        ]

    def __str__(self):
        return (
            f"{self.product.title} - "
            f"{self.get_type_display()}"
        )        