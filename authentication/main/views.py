from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from storage3 import create_client
from rest_framework_simplejwt import authentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
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
    user_pfp_url = request.data.get('user_pfp_url', '')
    user_pfp = request.FILES.get('user_pfp')
    
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
        
        profile_details = userProfile(user=user, user_addr=user_addr, user_gender=user_gender, user_pfp=user_pfp)
        profile_details.save()
            
        try:
            with open(f'main/images/user_pfp/{user_pfp}', 'rb') as img:
                storage_client.from_('Images').upload(file=img, path=f'user_pfp/{user_pfp}')
                
            image_public_url = storage_client.from_('Images').get_public_url(f'user_pfp/pfp.jpg')
            profile_details.user_pfp_url = image_public_url

            serialize_user_profile_data = UserProfileDetailsSerializer(profile_details).data
            
            profile_details.save()
        except:
            return Response({'message': 'Something went wrong please try again later :('}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'message':'Details Updated sucessfully', 'user':serialize_user_data, 'user_details':serialize_user_profile_data})
    
    except:
        return Response({'message':'Something went wrong please try again later'}, status=status.HTTP_400_BAD_REQUEST)

    
# this endpoint need authentication access token 
@api_view(['POST'])
@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    data = request.data
    try: 
        user = User.objects.get(username=data['username'], email=data['email'])
    except:
        return Response({'message': 'User Not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        userDetails = userProfile.objects.get(user=user)

        addresses = UserAddress.objects.filter(user_profile=userDetails)
        
        serialized_user_data = UserSerializer(user).data
        serialized_addresses = UserAddressSerializer(addresses, many=True).data
        serialized_userDetails_data = UserProfileDetailsSerializer(userDetails).data

        serialized_userDetails_data['address'] = serialized_addresses
        serialized_user_data['otherDetails'] = serialized_userDetails_data
    except:
        return Response({'message': 'Error while getting user details'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({'message':'User Is Present', 'allUserDetails': serialized_user_data})

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
                print(user_pfp)
                
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
        
        return Response({'message':'User Details Updates Sucessfully', 'userDetailsDara': serialize_user_profile_data})
    
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
