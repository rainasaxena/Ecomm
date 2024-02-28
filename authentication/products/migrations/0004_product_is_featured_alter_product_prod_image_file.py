# Generated by Django 4.2.5 on 2024-02-28 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_wishlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_featured',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='product',
            name='prod_image_file',
            field=models.ImageField(default='', max_length=999, upload_to='images/prod_image'),
        ),
    ]
