from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAuthenticated
from storage3 import create_client

from .models import Category

from .serializers import CategorySerializer

# Create your views here.
url = 'https://cdztpolwphkawmvkmrei.supabase.co/storage/v1'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkenRwb2x3cGhrYXdtdmttcmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgzNTY2OSwiZXhwIjoyMDE0NDExNjY5fQ.UHG5X_rjQ7k7OBFs2RnugvhmaVstsWk-3ehG-3UtlOQ"
headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

# pass in is_async=True to create an async client
storage_client = create_client(url, headers, is_async=False)

# Create your views here.
@api_view(['GET'])
def get_categories(request):
    category_objects=Category.objects.all()
    serializer_category_objects=CategorySerializer(category_objects, many=True)
    return Response({'message':'Categories Featched', 'category_objects':serializer_category_objects.data}, status=status.HTTP_200_OK)

@authentication_classes([authentication.JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_categories(request):
    cat_title = request.POST.get('cat_title', '')
    cat_image = request.FILES.get('cat_image_file')
    cat_image_url = request.data.get('cat_image_url', '')

    if not cat_title or not cat_image:
        return Response({'message':'Please fill in all the required fields.'})
    
    try:
        category=Category(cat_title=cat_title, cat_image_file=cat_image, cat_image_url=cat_image_url)
        print('Cat object Created')
        cat_id = category.cat_id
        category.save()

        try:
            category = Category.objects.get(cat_id=cat_id)
            with open(f'main/images/cat_image/{cat_image}', 'rb') as img:
                storage_client.from_('Images').upload(file=img, path=f'cat_image/{cat_image}')

            image_public_url = storage_client.from_('Images').get_public_url(f'cat_image/{cat_image}')
            category.cat_image_url = image_public_url

            serializer_category_objects=CategorySerializer(category)
            category.save()
            # serialize_user_profile_data = UserProfileDetailsSerializer(profile_details).data

        except Exception as e:
            return Response({'message':f'Not able to save category images: {e}'})

    except:
        return Response({'message':'Category not created!'})
    
    return Response({'message':'Category Created Sucessfully', 'category':serializer_category_objects.data}, status=status.HTTP_200_OK)
