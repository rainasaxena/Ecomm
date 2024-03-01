from django.db import models
from django.contrib.auth.models import User

from products.models import Product
from main.models import UserAddress
from cart.models import CartItem

import uuid

def generate_unique_order_id():
    import uuid
    return str(uuid.uuid4())

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = models.CharField(max_length=50, unique=True, default=generate_unique_order_id)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_date = models.DateTimeField(default=None, null=True, blank=True)
    payment_status = models.CharField(max_length=255, default='Pending')
    is_paid = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(UserAddress, on_delete=models.CASCADE, null=True, blank=True)
    transaction_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Order {self.order_id} for user {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"Order item {self.id} - Product: {self.product.prod_title} - Quantity: {self.quantity}"