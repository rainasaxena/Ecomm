from rest_framework.serializers import ModelSerializer
from .models import Product, Wishlist

class ProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields=('prod_id', 'prod_title', 'prod_desc', 'prod_image_url', 'prod_price', 'prod_old_price', 'prod_specs')
        
class GetProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class WishlistSerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model=Wishlist
        fields = '__all__'