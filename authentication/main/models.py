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
    user_pfp_url=models.URLField(default="",max_length=300) 
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






