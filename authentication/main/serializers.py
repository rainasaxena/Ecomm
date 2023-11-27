from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

from .models import userProfile, UserAddress

class UserAddressSerializer(ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        
class UserProfileDetailsSerializer(ModelSerializer):
    class Meta:
        model = userProfile
        fields = ('user_gender', 'user_phone', 'user_pfp_url')
        
class UserAddressSerializer(ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('address_type', 'address_line1', 'address_line2', 'city', 'state', 'country', 'postal_code')

class UserProfileSerializer(ModelSerializer):
    addresses = UserAddressSerializer(many=True, required=False)
    
    class Meta:
        model = userProfile
        fields = "__all__"
        
    def create(self, validated_data):
        addresses_data = validated_data.pop('addresses', [])
        user_profile = userProfile.objects.create(**validated_data)
        
        for address_data in addresses_data:
            UserAddress.objects.create(user_profile=user_profile, **address_data)
        
        return user_profile
    
    def update(self, instance, validated_data):
        addresses_data = validated_data.pop('addresses', [])
        
        instance.user_pfp = validated_data.get('user_pfp', instance.user_pfp)
        instance.user_gender = validated_data.get('user_gender', instance.user_gender)
        instance.save()

        # Update addresses
        instance.addresses.all().delete()
        for address_data in addresses_data:
            UserAddress.objects.create(user_profile=instance, **address_data)
            
        return instance