from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns=[
    path('', views.home, name='home'),
    path('home',views.home, name='home'),
    path('log-in/', csrf_exempt(views.log_in), name='log-in') ,  
    path('sign-up/', views.sign_up, name='sign-up'),
    path('update-user-profile/', views.update_user_profile, name='update-user-profile'),
    path('get-user-details/', views.get_user_details, name="get-userDetails"),
]