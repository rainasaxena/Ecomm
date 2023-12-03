from rest_framework.serializers import ModelSerializer
from .models import Product

class ProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields=('prod_id', 'prod_title', 'prod_desc', 'prod_price', 'prod_old_price', 'prod_specs')
        
class GetProductSerializer(ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'