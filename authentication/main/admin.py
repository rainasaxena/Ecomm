from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import userProfile, UserAddress

admin.site.register(userProfile)

admin.site.register(UserAddress)