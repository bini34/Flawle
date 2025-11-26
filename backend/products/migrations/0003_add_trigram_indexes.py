# products/migrations/0005_trigram_indexes.py
from django.contrib.postgres.indexes import GinIndex
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_enable_trigram'),   # ← safe and correct
    ]

    operations = [
        migrations.AddIndex(
            model_name='brand',
            index=GinIndex(name='brand_name_trgm_idx', fields=['name'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='brand',
            index=GinIndex(name='brand_slug_trgm_idx', fields=['slug'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='product',
            index=GinIndex(name='product_title_trgm_idx', fields=['title'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='product',
            index=GinIndex(name='product_slug_trgm_idx', fields=['slug'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='product',
            index=GinIndex(name='product_sku_trgm_idx', fields=['sku'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='category',
            index=GinIndex(name='cat_name_trgm_idx', fields=['name'], opclasses=['gin_trgm_ops']),
        ),
        migrations.AddIndex(
            model_name='category',
            index=GinIndex(name='cat_slug_trgm_idx', fields=['slug'], opclasses=['gin_trgm_ops']),
        ),
    ]