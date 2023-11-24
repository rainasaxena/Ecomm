from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe

# Create your models here.
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
