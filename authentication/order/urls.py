from django.urls import path
from . import views

urlpatterns = [
     path('orders/create/', views.createOrder, name='orders-create'),
     path('orders/', views.getOrders, name='orders-all'),
    #  path('orders/<str:pk>/', views.getOrderById, name='user-order')
]