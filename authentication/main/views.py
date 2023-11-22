from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import matplotlib.pyplot as plt
from storage3 import create_client
import datetime

from .forms import RegisterForm
from .serializers import UserSerializer, UserProfileDetailsSerializer, CategorySerializer, ProductSerializer
from .models import userProfile, Category, Product

url = 'https://cdztpolwphkawmvkmrei.supabase.co/storage/v1'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkenRwb2x3cGhrYXdtdmttcmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgzNTY2OSwiZXhwIjoyMDE0NDExNjY5fQ.UHG5X_rjQ7k7OBFs2RnugvhmaVstsWk-3ehG-3UtlOQ"
headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

# pass in is_async=True to create an async client
storage_client = create_client(url, headers, is_async=False)

# Create your views here.
def home(request):
    print(request)
    return render(request, 'main/home.html')

@api_view(['POST'])
def log_in(request):

    username = request.data.get('username')
    password = request.data.get('password')
    
    # check username exists in db
    check_user_exist = User.objects.filter(username=username).exists()
    
    if check_user_exist:
        user = authenticate(request=request, username=username, password=password)

        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)

            user_data = serializer.data
            del user_data['password'] # deleting password from data
            return Response({'messgae': 'User Logged in sucessful', 'user': user_data},)
        else:
            return Response({'message':'Incorrect Username or Password'})
    
    return Response({'messgae': 'User does not exist'})
    
@api_view(['POST'])
def sign_up(request):
    username = request.data.get('username', '')
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    
    if not username or not password or not email:
        return Response({'message':'Please fill in all the required fields.'})
    else:
            try :
                user = User.objects.create_user(username=username, password=password, email=email, last_name=last_name, first_name=first_name)
                serialize_user_data = UserSerializer(user).data
                del serialize_user_data['password']
                user.save()
                return Response({'message': 'User Profile Created Sucessfully', 'user': serialize_user_data}, status=status.HTTP_201_CREATED)
            except:
                return Response({'message': 'Something went Wrog !!'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'PATCH'])
def update_user_profile(request):
    
    username = request.data.get('username', '')
    userEmail = request.data.get('email', '')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    user_addr = request.data.get('user_addr', '')
    user_gender = request.data.get('user_gender', '')
    user_pfp = request.FILES.get('user_pfp')
    print(user_pfp) 
    
    try:
        user = User.objects.get(username=username, email=userEmail)
    except:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        user.first_name = first_name
        user.last_name = last_name
        serialize_user_data = UserSerializer(user).data
        del serialize_user_data['password']
        user.save()

        #check if user exists or not
        # if(userProfile.objects.filter(user=user).exists()):
        #     profile_details=userProfile.objects.get(user=user)
        # else:
        #updating remaning details 
        profile_details = userProfile(user=user, user_addr=user_addr, user_gender=user_gender, user_pfp=user_pfp)
        print("deatils being saved")
        profile_details.save()
        print("deatils saved")
            
        try:
            print(f'main/images/user_pfp/{user_pfp}')
            with open(f'main/images/user_pfp/{user_pfp}', 'rb') as img:
                storage_client.from_('Images').upload(file=img, path=f'user_pfp/{user_pfp}')
            print("Hello1")
            image_public_url = storage_client.from_('Images').get_public_url(f'user_pfp/pfp.jpg')
            profile_details.user_pfp = image_public_url
            print("Hello2")

            serialize_user_profile_data = UserProfileDetailsSerializer(profile_details).data
            
            profile_details.save()   
            print("details saved")
        except:
            return Response({'message': 'Something went wrong please try again later :('}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'message':'Details Updated sucessfully', 'user':serialize_user_data, 'user_details':serialize_user_profile_data})
    
    except:
        return Response({'message':'Something went wrong please try again later'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_categories(request):
    category_objects=Category.objects.all()
    serializer_category_objects=CategorySerializer(category_objects, many=True)
    print(serializer_category_objects.data)
    return Response({'message':'sab badhiya', 'category_objects':serializer_category_objects.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_categories(request):
    cat_title = request.POST.get('cat_title', '')
    cat_image = request.FILES.get('cat_image')

    if not cat_title or not cat_image:
        return Response({'message':'Please fill in all the required fields.'})
    
    try:
        category=Category(cat_title=cat_title, cat_image=cat_image)
        print('Cat object Created')
        cat_id = category.cat_id
        category.save()

        try:
            category = Category.objects.get(cat_id=cat_id)
            print('start...')
            with open(f'main/images/cat_image/{cat_image}', 'rb') as img:
                print('start-1')
                storage_client.from_('Images').upload(file=img, path=f'cat_image/{cat_image}')
                print('start-2')

            image_public_url = storage_client.from_('Images').get_public_url(f'cat_image/{cat_image}')
            category.cat_image = image_public_url
            print(image_public_url)

            serializer_category_objects=CategorySerializer(category)
            print(serializer_category_objects.data)
            category.save()
            print(image_public_url)
            # serialize_user_profile_data = UserProfileDetailsSerializer(profile_details).data

        except Exception as e:
            return Response({'message':f'Not able to save category images: {e}'})

    except:
        return Response({'message':'Category not created!'})
    
    return Response({'message':'ban gyi category', 'category':serializer_category_objects.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_product(request):
    # user_id = 
    # category_id prod_title prod_image prod_desc prod_price prod_old_price 
    # prod_specs prod_instock prod_date_added prod_date_updated
    posted_data = request.data
    
    # check for category
    try:
        print(posted_data['category_id'])
        category = Category.objects.get(cat_id=posted_data['category_id'])
    except Exception as e:
        return Response({'message': 'Category does not exist'}, status=status.HTTP_204_NO_CONTENT)
    
    try:
        new_product = Product(category=category, prod_title=posted_data['prod_title'], prod_desc=posted_data['prod_desc'], prod_image=request.FILES.get('prod_image'), prod_price=int(posted_data['prod_price']), prod_old_price=int(posted_data['prod_old_price']), prod_specs=posted_data['prod_specs']) #, prod_instock=bool(posted_data['prod_instock']), prod_date_added=datetime.datetime.strptime(posted_data['prod_date_added'], '%d/%m/%Y').date(), prod_date_updated=datetime.datetime.strptime(posted_data['prod_date_updated'], '%d/%m/%Y').date())
        serialized_product =  ProductSerializer(new_product)
        try:
            if ProductSerializer(data=serialized_product.data).is_valid():
                print('Saving product')
                new_product.save()
        except Exception as e:
            return Response({'message': f'Product Not saved someting went wrong :(: {e}' }, status=status.HTTP_204_NO_CONTENT)
        
    except Exception as e:
        return Response({'message': f'Something went wrong please try again: {e}'})
    # create new product with user and 
    return Response({'message': 'data recived'})