import uuid
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.utils.text import slugify
from core.models import TimeStampedModel


class Category(TimeStampedModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    name = models.CharField(
        max_length=255
    )

    slug = models.SlugField(
        max_length=255
    )

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="children",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["parent", "slug"],
                condition=Q(parent__isnull=False),
                name="unique_category_slug_per_parent",
            ),
            models.UniqueConstraint(
                fields=["slug"],
                condition=Q(parent__isnull=True),
                name="unique_root_category_slug",
            ),
        ]

        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        if self.parent:
            return f"{self.parent} > {self.name}"

        return self.name   