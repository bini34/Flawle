import uuid

from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.core.validators import MinValueValidator


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Brand(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        indexes = [models.Index(fields=["slug"])]
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:  # pragma: no cover
        return self.name

class Category(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE, related_name="children"
    )
    slug = models.SlugField(max_length=255)

    class Meta:
        unique_together = ("parent", "slug")
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["parent", "slug"]),
        ]
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:  # pragma: no cover
        if self.parent:
            return f"{self.parent} > {self.name}"
        return self.name


class Product(TimeStampedModel):
    STATUS_ACTIVE = "active"
    STATUS_INACTIVE = "inactive"
    STATUS_OUT_OF_STOCK = "out_of_stock"
    STATUS_CHOICES = [
        (STATUS_ACTIVE, "Active"),
        (STATUS_INACTIVE, "Inactive"),
        (STATUS_OUT_OF_STOCK, "Out of stock"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=255)
    sku = models.CharField(max_length=64, unique=True)
    brand = models.ForeignKey(
        Brand, on_delete=models.PROTECT, related_name="products", null=True, blank=True)
    slug = models.SlugField(max_length=255)
    short_description = models.TextField(blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])

    currency = models.CharField(max_length=3, default="ETB")
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="products"
    )
    stock_qty = models.PositiveIntegerField(default=0)
    published_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_ACTIVE)

  
    class Meta:
        unique_together = ("category", "slug")
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["sku"]),
            models.Index(fields=["category", "slug"]),
            models.Index(fields=["status"]),
        ]
        ordering = ["-created_at"]
      
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.sku:
            self.sku = f"SKU-{uuid.uuid4().hex[:10].upper()}"

       # Auto status based on stock
        if self.stock_qty <= 0 and self.status == self.STATUS_ACTIVE:
            self.status = self.STATUS_OUT_OF_STOCK
        elif self.stock_qty > 0 and self.status == self.STATUS_OUT_OF_STOCK:
            self.status = self.STATUS_ACTIVE

        if self.status == self.STATUS_ACTIVE and self.published_at is None:
            self.published_at = timezone.now()
        if self.status != self.STATUS_ACTIVE:
            self.published_at = None

        super().save(*args, **kwargs)
   
    def __str__(self) -> str:  # pragma: no cover
        return f"{self.title} ({self.brand})"


class ProductVariant(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    name = models.CharField(max_length=50)  # e.g., 30ml, 100ml
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, validators=[MinValueValidator(0)])
    stock_qty = models.PositiveIntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["id"]
        indexes = [models.Index(fields=["sku"])]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.product.title} - {self.name}"


class ProductImage(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="product_images/")  # This saves file
    position = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("product", "position")
        ordering = ["position", "id"]

    def __str__(self) -> str:  # pragma: no cover
        return f"Image {self.position} for {self.product.title}"


class ProductDetail(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TYPE_DESCRIPTION = "description"
    TYPE_INGREDIENTS = "ingredients"
    TYPE_HOW_TO_USE = "how_to_use"
    TYPE_BENEFITS = "benefits"
    TYPE_CHOICES = [
        (TYPE_DESCRIPTION, "Description"),
        (TYPE_INGREDIENTS, "Ingredients"),
        (TYPE_HOW_TO_USE, "How to use"),
        (TYPE_BENEFITS, "Benefits"),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="details")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    content = models.TextField()

    class Meta:
        unique_together = ("product", "type")
        ordering = ["type", "id"]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.product.title} - {self.get_type_display()}"


