# Generated by Django 4.2.3 on 2023-11-23 18:12

from django.db import migrations, models
import django.db.models.deletion
import shortuuid.django_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("main", "0019_delete_product"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "prod_id",
                    shortuuid.django_fields.ShortUUIDField(
                        alphabet="ijklmno6789",
                        length=22,
                        max_length=100,
                        prefix="ijh",
                        unique=True,
                    ),
                ),
                ("prod_title", models.CharField(default="", max_length=100)),
                (
                    "prod_image_file",
                    models.ImageField(
                        default="", max_length=999, upload_to="main/images/prod_image"
                    ),
                ),
                ("prod_image_url", models.URLField(default="", max_length=300)),
                ("prod_desc", models.TextField(blank=True, default="", null=True)),
                (
                    "prod_price",
                    models.DecimalField(decimal_places=2, default=1.99, max_digits=10),
                ),
                (
                    "prod_old_price",
                    models.DecimalField(decimal_places=2, default=2.99, max_digits=10),
                ),
                ("prod_specs", models.TextField(blank=True, null=True)),
                ("prod_instock", models.BooleanField(default=True)),
                ("prod_date_added", models.DateTimeField(auto_now_add=True)),
                ("prod_date_updated", models.DateTimeField(auto_now_add=True)),
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="main.category",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Products",
            },
        ),
    ]
