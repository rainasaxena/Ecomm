# Generated by Django 4.2.3 on 2023-11-24 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0019_delete_product"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserAddress",
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
                    "address_type",
                    models.CharField(
                        choices=[
                            ("Work", "Work"),
                            ("Home", "Home"),
                            ("Others", "Others"),
                        ],
                        max_length=10,
                    ),
                ),
                ("address_line1", models.CharField(max_length=150)),
                (
                    "address_line2",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("city", models.CharField(max_length=50)),
                ("state", models.CharField(max_length=50)),
                ("country", models.CharField(max_length=50)),
                ("postal_code", models.CharField(max_length=20)),
            ],
        ),
        migrations.DeleteModel(
            name="Category",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="user_addr",
        ),
        migrations.AddField(
            model_name="useraddress",
            name="user_profile",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="addresses",
                to="main.userprofile",
            ),
        ),
    ]
