from django.contrib import admin
from django.utils.html import mark_safe
from .models import Product, Wishlist

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('prod_title', 'display_price', 'display_inStock', 'display_category',  'display_prod_image', 'display_updated_at')

    def display_category(self, obj):
        return obj.category.cat_title if obj.category else "No category"
    display_category.short_description = 'Category'

    def display_prod_image(self, obj):
        if obj.prod_image_url:
            return mark_safe(f'<img src="{obj.prod_image_url}" width="80" height="80"/>')
        else:
            return "No image available"
    display_prod_image.short_description = 'Product Image'
    
    def display_price(self, obj):
        return obj.prod_price
    display_price.short_description = "Price"
    
    def display_inStock(self, obj):
        return obj.prod_instock
    display_inStock.short_description = "In Stock"
    
    def display_updated_at(self, obj):
        return obj.prod_date_updated
    display_updated_at.short_description = "Updated On"

admin.site.register(Product, ProductAdmin)
admin.site.register(Wishlist)