from django.db import models
from django.contrib.auth.models import User
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe


# Create your models here.

class userProfile(models.Model):

    GENDER_CHOICES=(
        ('M','Male'),
        ('F','Female'),
        ('O','Other')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_pfp=models.ImageField(upload_to='main/images/user_pfp', default="")
    user_addr=models.CharField(max_length=999)
    user_gender=models.CharField(max_length=1, choices=GENDER_CHOICES)


    def __str__(self):
        return self.user.username
    
#Category Database
class Category(models.Model):
    cat_id=ShortUUIDField(unique=True, length=10, max_length=20, prefix="ijh", alphabet="abcdefgh12345")
    cat_title=models.CharField(max_length=100)
    cat_image_file=models.ImageField(upload_to="main/images/cat_image", default="", max_length=999)
    cat_image_url = models.URLField(default='', max_length=300)
    
    class Meta:
        verbose_name_plural="Categories"

    def category_image(self):
        return mark_safe('<img src="%s" width="50" height="50"/>' % (self.cat_image.url))
    
    def __str__ (self):
        return self.cat_title
    

#Product Database
class Product(models.Model):
    prod_id = ShortUUIDField(unique=True, max_length=100, prefix="ijh", alphabet="ijklmno6789")
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    prod_title = models.CharField(max_length=100, default="")
    prod_image_file = models.ImageField(upload_to="main/images/prod_image", default="", max_length=999)
    prod_image_url = models.URLField(default="", max_length=300)
    prod_desc = models.TextField(null=True, blank=True, default="")
    prod_price = models.DecimalField(max_digits=10, decimal_places=2, default=1.99)  # Use a reasonable precision
    prod_old_price = models.DecimalField(max_digits=10, decimal_places=2, default=2.99)  # Use a reasonable precision

    prod_specs = models.TextField(null=True, blank=True)
    prod_instock = models.BooleanField(default=True)
    prod_date_added = models.DateTimeField(auto_now_add=True)
    prod_date_updated = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Products"

    def image_tag(self):
        return mark_safe('<img src="%s" width="100" height="100"/>' % (self.prod_image_url))
        
    def __str__(self):
        return self.prod_title
    
    image_tag.allow_tags = True
 
    # PROD_STATUS=(
#     ("out", "Out of Stock"),
#     ("available", "Available")
# )
    # prod_status=models.CharField(choices=PROD_STATUS, max_length=10, default="Available")






