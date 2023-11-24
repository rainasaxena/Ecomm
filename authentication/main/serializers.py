from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

from .models import userProfile, Category#, Product

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        
class UserProfileDetailsSerializer(ModelSerializer):
    class Meta:
        model = userProfile
        fields = ('user_addr', 'user_gender', 'user_pfp', 'user_pfp_url')
