from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Product, userProfile

admin.site.register(userProfile)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list = ['cat_title', 'display_image']
    
    def display_image(self, obj):
        return mark_safe('<img src="{url}" width="100" height="100" />'.format(url=obj.cat_image_url))

    display_image.allow_tags = True
    display_image.short_description = 'Banner Preview'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['prod_title', 'display_image']
    
    def display_image(self, obj):
        return mark_safe('<img src="{url}" width="100" height="100" />'.format(url=obj.prod_image_url))

    display_image.allow_tags = True
    display_image.short_description = 'Image Preview'