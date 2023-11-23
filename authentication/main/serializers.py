from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

from .models import userProfile, Category, Product

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        
class UserProfileDetailsSerializer(ModelSerializer):
    class Meta:
        model = userProfile
        fields = ('user_addr', 'user_gender', 'user_pfp')


class CategorySerializer(ModelSerializer):
    class Meta:
        model=Category
        fields=('cat_id', 'cat_title', 'cat_image_file', 'cat_image_url')

class ProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields=('prod_title', 'prod_desc', 'prod_price', 'prod_old_price', 'prod_specs')
        
class GetProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'