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
    user_gender=models.CharField(max_length=1, choices=GENDER_CHOICES)
    user_phone=models.CharField(max_length=15, null=True)

    def __str__(self):
        return self.user.username

# model for user address
class UserAddress(models.Model):
    USER_TYPE_CHOICES = [('Work', 'Work'), ('Home', 'Home'), ('Others', 'Others')]
    user_profile = models.ForeignKey(userProfile, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    address_line1 = models.CharField(max_length=150)
    address_line2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, default='')
    state = models.CharField(max_length=50, default='')
    country = models.CharField(max_length=50, default='India')
    postal_code = models.CharField(max_length=20, default='')
    
    def __str__(self):
        return f'{self.user_profile.user.username} - {self.address_type} Address'






