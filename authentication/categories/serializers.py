from rest_framework.serializers import ModelSerializer
from .models import Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model=Category
        fields=('cat_id', 'cat_title', 'cat_image_file', 'cat_image_url')