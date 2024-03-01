from rest_framework import serializers
from .models import Order, OrderItem

from products.serializers import ProductSerializer
from main.serializers import UserAddressSerializer, UserSerializer

from django.contrib.auth.models import User
from main.models import UserAddress
from cart.models import Cart

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ('product', 'quantity')

class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    shipping_address = UserAddressSerializer()
    class Meta:
        model = Order
        fields =  ('order_id', 'user', 'created_at', 'updated_at', 'total_amount', 'payment_date', 'payment_status', 'is_paid', 'transaction_id', 'shipping_address')