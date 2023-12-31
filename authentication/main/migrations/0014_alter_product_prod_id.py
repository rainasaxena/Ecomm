# Generated by Django 4.2.5 on 2023-11-22 12:20

from django.db import migrations
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_product_prod_desc_alter_product_prod_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='prod_id',
            field=shortuuid.django_fields.ShortUUIDField(alphabet='ijklmno6789', length=22, max_length=100, prefix='ijh', unique=True),
        ),
    ]
