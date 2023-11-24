from django.urls import path
from . import views

urlpatterns = [
    path('get-categories/', views.get_categories, name='get-categories'),
    path('create-category/', views.create_categories, name='create-categories'),
]