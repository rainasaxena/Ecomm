from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Category

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['display_id', 'cat_title', 'display_image']
    
    def display_id(self, obj):
        return obj.cat_id
    display_id.short_description="Category Id"
    
    def display_image(self, obj):
        return mark_safe('<img src="{url}" width="50" height="50" />'.format(url=obj.cat_image_url))

    display_image.allow_tags = True
    display_image.short_description = 'Banner Preview'
    
admin.site.register(Category, CategoryAdmin)