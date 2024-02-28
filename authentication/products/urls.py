from django.urls import path
from . import views

urlpatterns = [
    path('create-product/', views.create_product, name='create-product'),
    path('get-products/', views.get_products, name='get-products'),
    path('products/featured/', views.get_featured_products, name='get-featured-products'),
    path('wishlist/', views.getUserWishlist, name='get-wishlist'),
    path('wishlist/add/', views.addToWishlist, name='add-wishlist-product'),
    path('wishlist/remove/', views.removeFromWishlist, name='remove-wishlist-product'),
]