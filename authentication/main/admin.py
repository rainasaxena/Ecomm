from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import userProfile

admin.site.register(userProfile)

# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list = ['cat_title', 'display_image']
    
#     def display_image(self, obj):
#         return mark_safe('<img src="{url}" width="100" height="100" />'.format(url=obj.cat_image_url))

#     display_image.allow_tags = True
#     display_image.short_description = 'Banner Preview'

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ['prod_title', 'display_image']
    
#     def display_image(self, obj):
#         return mark_safe('<img src="{url}" width="100" height="100" />'.format(url=obj.prod_image_url))

#     display_image.allow_tags = True
#     display_image.short_description = 'Image Preview'

# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('prod_title', 'display_price', 'display_inStock', 'display_category',  'display_prod_image', 'display_updated_at')

#     def display_category(self, obj):
#         return obj.category.cat_title if obj.category else "No category"
#     display_category.short_description = 'Category'

#     def display_prod_image(self, obj):
#         if obj.prod_image_url:
#             return mark_safe(f'<img src="{obj.prod_image_url}" width="100" height="100"/>')
#         else:
#             return "No image available"
#     display_prod_image.short_description = 'Product Image'
    
#     def display_price(self, obj):
#         return obj.prod_price
#     display_price.short_description = "Price"
    
#     def display_inStock(self, obj):
#         return obj.prod_instock
#     display_inStock.short_description = "In Stock"
    
#     def display_updated_at(self, obj):
#         return obj.prod_date_updated
#     display_updated_at.short_description = "Updated On"

# admin.site.register(Product, ProductAdmin)