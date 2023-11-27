from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe
from django.contrib.auth.models import User
from categories.models import Category

# Create your models here.
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
    prod_date_updated = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def image_tag(self):
        return mark_safe('<img src="%s" width="100" height="100"/>' % (self.prod_image_url))
        
    def __str__(self):
        return self.prod_title
    
    image_tag.allow_tags = True

# class Wishlist(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#     products = models.ManyToManyField(Product)
    
#     def __str__(self) -> str:
#         return f'Wishlist for {self.user.username}'