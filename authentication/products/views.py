from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from storage3 import create_client

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAuthenticated 

from .models import Product, Wishlist
from django.contrib.auth.models import User

from categories.models import Category

from .serializers import GetProductSerializer, ProductSerializer, WishlistSerializer

# Create your views here.
url = 'https://cdztpolwphkawmvkmrei.supabase.co/storage/v1'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkenRwb2x3cGhrYXdtdmttcmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgzNTY2OSwiZXhwIjoyMDE0NDExNjY5fQ.UHG5X_rjQ7k7OBFs2RnugvhmaVstsWk-3ehG-3UtlOQ"
headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

# pass in is_async=True to create an async client
storage_client = create_client(url, headers, is_async=False)

@api_view(['POST'])
def create_product(request):
    posted_data = request.data
    
    # check for category
    try:
        category = Category.objects.get(cat_id=posted_data['cat_id'])
    except Exception as e:
        return Response({'message': 'Category does not exist'}, status=status.HTTP_204_NO_CONTENT)
    
    try:
        new_product = Product(category=category, prod_title=posted_data['prod_title'], prod_desc=posted_data['prod_desc'], prod_image_file=request.FILES.get('prod_image_file'), prod_price=int(posted_data['prod_price']), prod_old_price=int(posted_data['prod_old_price']), prod_specs=posted_data['prod_specs']) #, prod_instock=bool(posted_data['prod_instock']), prod_date_added=datetime.datetime.strptime(posted_data['prod_date_added'], '%d/%m/%Y').date(), prod_date_updated=datetime.datetime.strptime(posted_data['prod_date_updated'], '%d/%m/%Y').date())
        serialized_product =  ProductSerializer(new_product)
        try:
            if ProductSerializer(data=serialized_product.data).is_valid():
                
                # saving image to db
                prod_image = request.FILES.get('prod_image_file')
                print(prod_image)
                new_product.save()
                
                try:
                                     
                    with open(f'main/images/prod_image/{prod_image}', 'rb') as img:
                       storage_client.from_('Images').upload(file=img, path=f'product_images/{category.cat_title}/{prod_image}')
                        
                    image_public_url = storage_client.from_('Images').get_public_url(f'product_images/{category.cat_title}/{prod_image}')   
                except:
                    return Response({'message': 'Error In saving image '}, status=status.HTTP_400_BAD_REQUEST)
                
                new_product.prod_image_url = image_public_url
                print(image_public_url)
                new_product.save(update_fields=['prod_image_url'])
        except Exception as e:
            return Response({'message': f'Product Not saved someting went wrong :(: {e}' }, status=status.HTTP_204_NO_CONTENT)
        
    except Exception as e:
        return Response({'message': f'Something went wrong please try again: {e}'})
    
    # create new product with user and 
    return Response({'message': 'data recived'})


@api_view(['POST'])
def get_products(request):
    category_id = request.data.get('cat_id')
    
    try:
        category = Category.objects.get(cat_id= category_id)
    except:
        return Response({'message': 'Category Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        products = Product.objects.filter(category = category)
        serializedData = GetProductSerializer(products, many=True)
    except: 
        return Response({'message': 'GET Products failed something went wrong'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({'message': 'Products fetched sucessful', 'productsData': serializedData.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUserWishlist(request):
    data = request.data
    
    try:
        print(data['username'])
        print(data['email'])
        user = User.objects.get(username=data['username'], email=data['email'])
        print(f'Cart Exist: {Wishlist.objects.filter(user=user).exists()}')
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try: 
        if Wishlist.objects.filter(user=user).exists():
            list_items = Wishlist.objects.get(user=user)
            serializer = WishlistSerializer(list_items)

            return Response({'message': 'Data fetching sucessfull', 'cartData': serializer.data}, status=200)
        else:
            print('Creating cart for user')
            wishList = Wishlist.objects.create(user=user)
            serializer = WishlistSerializer(wishList)
            return Response({'message': 'Data fetching sucessfull', 'cartData': serializer.data}, status=200)
    
    except:
        return Response({'message': 'Error in data getting'}, status=404)
    
    
@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def addToWishlist(request):
    # required fields => username, email, prod_id, 
    data = request.data
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try:
        if Wishlist.objects.filter(user=user).exists():
            wishList = Wishlist.objects.get(user=user)
        else:
            wishList = Wishlist.objects.create(user=user)
            
    except:
        return Response({'message': 'Error in Creating cart'})
    
    try:
        product = Product.objects.get(prod_id=data['prod_id'])
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    wishList.products.add(product)
    serializer = WishlistSerializer(wishList)
    return Response({'message': 'CartCreated', 'cartData': serializer.data}, status=200)


@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def removeFromWishlist(request):
    # required fields => username, email, prod_id, 
    data = request.data
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User Does not exist'}, status=404)
    
    try:
        if Wishlist.objects.filter(user=user).exists():
            wishList = Wishlist.objects.get(user=user)
        else:
            wishList = Wishlist.objects.create(user=user)
            
    except:
        return Response({'message': 'Error in Creating cart'})
    
    try:
        product = Product.objects.get(prod_id=data['prod_id'])
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    wishList.products.remove(product)
    serializer = WishlistSerializer(wishList)
    return Response({'message': 'CartCreated', 'cartData': serializer.data}, status=200)
    