# Generated by Django 5.0.1 on 2024-03-01 20:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0005_order_is_paid_order_payment_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='total_price',
            new_name='total_amount',
        ),
    ]
