from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status

from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import Order, OrderItem
from main.models import UserAddress, userProfile
from products.models import Product
from cart.models import Cart, CartItem

from .serializers import OrderSerializer, OrderItemSerializer
from cart.serializers import CartItemsSerializer, CartSerializer

@api_view(['POST'])
def createOrder(request):
    data = request.data

    try:
        user = User.objects.get(username=data['username'], email=data['email'])
        user_profile = userProfile.objects.get(user=user)
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try:
        address = UserAddress.objects.get(user_profile=user_profile, address_type=data['shipping_address']['address_type'])
        
    except:
        return Response({'message': 'Address Does not exist'}, status=404)
    
    try:
        cart = Cart.objects.get(user=user, cart_id=data['cart_id'])
        cart_items = CartItem.objects.filter(cart=cart)
    except:
        return Response({'message': 'Cart Does not exist'}, status=404)
    
    try:
        order = Order.objects.create(
            user=user, 
            total_amount=data['total_amount'], 
            payment_date=data['payment_date'], 
            payment_status=data['payment_status'], 
            is_paid=data['is_paid'] == 'true', 
            transaction_id=data['transaction_id'], 
            shipping_address=address
        )

        for item in cart_items:
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
        order.save()
        user.cart.products.clear()

    except Exception as e:
        
        return Response({'message': 'Error in Creating Order'}, status=400)
    
    return Response({'message': 'Order Created'}, status=200)

@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def getOrders(request):
    data = request.data

    try:
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try:
        userOrders = []
        orders = Order.objects.filter(user=user)         

        for order in orders:
            order_items = OrderItem.objects.filter(order=order)
            order_serializer= OrderSerializer(order)
            order_items_serializer = OrderItemSerializer(order_items, many=True)
            userOrders.append({'order': order_serializer.data, 'order_items': order_items_serializer.data})

        return Response({'orders': userOrders, 'message': 'Orders Fetched'}, status=200)
          
    except Exception as e:
        return Response({'message': 'Orders Does not exist'}, status=404)