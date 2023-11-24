from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Category

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list = ['cat_title', 'display_image']
    
    def display_image(self, obj):
        return mark_safe('<img src="{url}" width="100" height="100" />'.format(url=obj.cat_image_url))

    display_image.allow_tags = True
    display_image.short_description = 'Banner Preview'