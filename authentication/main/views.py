import random

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from storage3 import create_client
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt import authentication, tokens
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .forms import RegisterForm
from .serializers import UserSerializer, UserProfileDetailsSerializer, UserProfileSerializer, UserAddressSerializer
from .models import userProfile, UserAddress
from .utils import create_user_address_object, create_user_profile_object

url = 'https://cdztpolwphkawmvkmrei.supabase.co/storage/v1'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkenRwb2x3cGhrYXdtdmttcmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgzNTY2OSwiZXhwIjoyMDE0NDExNjY5fQ.UHG5X_rjQ7k7OBFs2RnugvhmaVstsWk-3ehG-3UtlOQ"
headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

# pass in is_async=True to create an async client
storage_client = create_client(url, headers, is_async=False)

USER_MALE_IMAGES = [
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_1369aebe-5ac2-4a9e-b444-670bbae827cf.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_744764ec-4726-41c4-8374-ffedf7fd8676.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_9c38f40b-5999-4587-8341-38effcb2d214.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_ea9077f6-993e-42f1-a43e-da3fc8b81810.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_f5c43535-c172-4c55-906e-a541321b9b55.jpg",
]

USERS_FEMALE_IMAGES = [
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_080625a1-ff4a-4608-a83b-89a997f5f78f.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_1369aebe-5ac2-4a9e-b444-670bbae827cf.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_682fbeb1-d416-44ea-bd9b-835d7791b51d.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_753724c0-7a4b-48ed-926c-54dc53dd0a41.jpg",
    "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_ff37aa7c-deb2-4db8-baaf-adf36107268c.jpg",
]

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
            return Response({'messgae': 'User Logged in sucessful', 'user': user_data},)
        else:
            return Response({'message':'Incorrect Username or Password'})
    
    return Response({'messgae': 'User does not exist'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_out(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = tokens.RefreshToken(refresh_token)
        token.blacklist()

        return Response(status=status.HTTP_205_RESET_CONTENT)
    
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
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
                user.save()
            except:
                return Response({'message': 'Something went Wrog !!'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'message': 'User Profile Created Sucessfully', 'user': serialize_user_data}, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'PATCH'])
def update_user_profile(request):
    data = request.data

    try:
        user = User.objects.get(username=data["username"], email=data["email"])
    except:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        serialize_user_data = UserSerializer(user).data
        print('Done-1')
        if('password' in serialize_user_data.keys()):
            del serialize_user_data['password']
        print('Done-2')
        user.save()
        print('Done-3')

        if data["user_gender"] == 'M':
            image_public_url = random.choice(USER_MALE_IMAGES)
        elif data["user_gender"] == 'F':
            image_public_url = random.choice(USERS_FEMALE_IMAGES)
        else:
            image_public_url = random.choice(USER_MALE_IMAGES + USERS_FEMALE_IMAGES)

        profile_details = userProfile(
            user=user, 
            user_gender=data["user_gender"], 
            user_phone=data["user_phone"], 
            user_pfp_url=image_public_url
        )

        print('Done-4')
        profile_details.save()
        serialize_user_profile_data = UserProfileSerializer(profile_details).data
        print(profile_details)

        try:
            user_address = UserAddress(
                user_profile=profile_details,
                address_type=data['address_type'],
                address_line1=data['address_line1'],
                address_line2=data['address_line2'],
                city=data['city'],
                state=data['state'],
                country=data['country'],
                postal_code=data['postal_code']
            )
            user_address.save()
            return Response({'message':'Details Updated sucessfully', 'user':serialize_user_data, 'user_details':serialize_user_profile_data})
        except Exception as e:
            print(e)
            return Response({'message':'Something went wrong please try again later'}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(e)
        return Response({'message':'Something went wrong please try again later'}, status=status.HTTP_400_BAD_REQUEST)

    
# this endpoint need authentication access token 
@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    data = request.data
    print(data["email"])
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
    try:
        userDetails = userProfile.objects.get(user=user)

        addresses = UserAddress.objects.filter(user_profile=userDetails)
            
        serialized_user_data = UserSerializer(user).data
        serialized_addresses = UserAddressSerializer(addresses, many=True).data
        serialized_userDetails_data = UserProfileDetailsSerializer(userDetails).data

        serialized_userDetails_data['address'] = serialized_addresses
            
    except Exception as e:
        return Response({'message': 'User Details Not Fetched, Someting Went Worng'}, status=status.HTTP_404_NOT_FOUND)
        
    return Response({'message': 'User Details Fetched', 'user': {**serialized_user_data, **serialized_userDetails_data}}, status=status.HTTP_200_OK)

@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
class UpdateProfileView(APIView):
    
    def get(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data['username'], email=data['email'])
        except:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            userDetails = userProfile.objects.get(user=user)

            addresses = UserAddress.objects.filter(user_profile=userDetails)
            
            serialized_user_data = UserSerializer(user).data
            serialized_addresses = UserAddressSerializer(addresses, many=True).data
            serialized_userDetails_data = UserProfileDetailsSerializer(userDetails).data

            serialized_userDetails_data['address'] = serialized_addresses
            
        except Exception as e:
            return Response({'message': 'User Details Not Fetched, Someting Went Worng'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'message': 'User Details Fetched', 'user': {**serialized_user_data, **serialized_userDetails_data}}, status=status.HTTP_200_OK)     
               
    def post(self, request):
        data = request.data
        print(data['username'])
        try:
            user = User.objects.get(username=data['username'], email=data['email'])
        except:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if data['first_name']: user.first_name = data['first_name'] # updating first name if it has new values
        if data['last_name'] : user.last_name = data['last_name'] # updaing last_name if it is changed
        user.save()
        
        try:
            userProfileObj = create_user_profile_object(user, data)
            userProfileObj.save()
            
            # saving address of user
            userAddressObj = create_user_address_object(userProfileObj, data)
            userAddressObj.save()
            
            try:
                user_pfp = data['user_pfp']
                print(f'User Pfp: {user_pfp}')
                
                with open(f'main/images/user_pfp/{user_pfp}', 'rb') as img:
                    storage_client.from_('Images').upload(file=img, path=f'user_pfp/{user_pfp}')
                    
                image_public_url = storage_client.from_('Images').get_public_url(f'user_pfp/{user_pfp}')
                userProfileObj.user_pfp_url = image_public_url

                userProfileObj.save(update_fields=['user_pfp_url'])
                serialize_user_profile_data = UserProfileDetailsSerializer(userProfileObj).data
                
            except:
                return Response({'message': 'Something went wrong please try again later :('}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({'message': f'User Not updated something went wromg: {e}'})
        
        return Response({'message':'User Details Updates Sucessfully', 'userDetailsData': serialize_user_profile_data})
    
    def put(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data['username'], email=data['email'])
            user_serializer = UserSerializer(user, data=data)
            print(user_serializer.is_valid())
            if user_serializer.is_valid():
                user_serializer.save()
                
        except Exception as e:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            userProfileObj = userProfile.objects.get(user=user)
            serializer = UserProfileDetailsSerializer(userProfileObj, data=data)
            if serializer.is_valid():
                serializer.save()
                
        except Exception as e:
            return Response({'message': f'Something went wrong: {e}'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'message':'Put request for user details'})


@api_view(['POST'])
def add_address(request):
    data = request.data
    
    try:
        user = User.objects.get(username=data['username'], email=data['email'])
        userProfileObj = userProfile.objects.get(user=user)
    except:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        addressObject = create_user_address_object(userProfileObj, data)
        serializer = UserAddressSerializer(addressObject)
        
        if UserAddressSerializer(data=serializer.data).is_valid(raise_exception=True):
            addressObject.save()
            
            userProfileObj = userProfile.objects.get(user=user)
            addresses = UserAddress.objects.filter(user_profile=userProfileObj)
            
            serialized_user_data = UserSerializer(user).data
            serialized_addresses = UserAddressSerializer(addresses, many=True).data
            serialized_userDetails_data = UserProfileDetailsSerializer(userProfileObj).data

            serialized_userDetails_data['address'] = serialized_addresses
            
            return Response({'message': 'Address Addes Sucessufully', 'user': {**serialized_user_data, **serialized_userDetails_data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Address data is not valid'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
    except Exception as e:
        return Response({'message': f'Something wend wrong cant save address: {e}'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    