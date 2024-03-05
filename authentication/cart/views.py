from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status

from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemsSerializer, updateCartItemSerializer
from products.models import Product

@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def addToCart(request):
    # required fields => username, email, prod_id, 
    data = request.data
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try:
        if Cart.objects.filter(user=user).exists():
            cart = Cart.objects.get(user=user)
        else:
            cart = Cart.objects.create(user=user)
            
    except:
        return Response({'message': 'Error in Creating cart'})
    
    try:
        product = Product.objects.get(prod_id=data['prod_id'])
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity = int(data['quantity'])
        cart_item.save()
    
    serializer = CartSerializer(cart)
    return Response({'message': 'CartCreated', 'cartData': serializer.data}, status=200)
    
@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUserCart(request):
    data = request.data
    
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
        
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try: 
        if Cart.objects.filter(user=user).exists():
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)
            serializer = CartItemsSerializer(cart_items, many=True)

            return Response({'message': 'Data fetching sucessfull', 'cartData': serializer.data, 'cart_id': cart.cart_id}, status=200)
        else:
            
            cart = Cart.objects.create(user=user)
            return Response({'message': 'Data fetching sucessfull', 'cartData': []}, status=200)
    
    except:
        return Response({'message': 'Error in data getting'}, status=404)
    
@api_view(['PUT'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def updateCartItem(request):
    # input fields cart_id, prod_id, quantity
    data = request.data
    try:
        cart_item = CartItem.objects.get(id=data['cartItem_id'])
        
        try:
            cart_item.quantity = data['quantity']
            cart_item.save()
            return Response({'message': 'Cart item updated sucessfully'}, status=200)
        except:
            return Response({'message': 'Cart item not updated try again'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message': 'Product cart item Not Found'}, status=status.HTTP_304_NOT_MODIFIED)

@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def deleteCartItems(request):
    data = request.data
    try:
        cart_item = CartItem.objects.get(id=data['cartItem_id'])
        try:
            cart_item.delete()
            return Response({"message": 'Item removed sucessfully'}, status=200)
        except:
            return Response({'message':'Cart item not deleted try again'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message': 'Product cart item Not Found'})
        
    
    
        