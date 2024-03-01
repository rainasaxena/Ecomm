from django.db import models
from django.contrib.auth.models import User
from products.models import Product

import uuid

# referances ==> https://github.com/justdjango/django-ecommerce/blob/master/core/models.py
def generate_unique_cart_id():
    return str(uuid.uuid4())

class Cart(models.Model):
    cart_id = models.CharField(max_length=50, unique=True, default=generate_unique_cart_id)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='CartItem', related_name='carts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Cart for user {self.user.username}"
    
    def get_total_price(self):
        total_price = 0
        cart_items = CartItem.objects.filter(cart=self)
        
        for item in cart_items:
            total_price += item.Product.prod_price * item.quantity
        return total_price


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.cart.user.username}' cart -- Product: {self.product.prod_title} -- Quantity: {self.quantity}"