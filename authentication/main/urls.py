from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns=[
    path('', views.home, name='home'),
    path('home',views.home, name='home'),
    path('log-in/', csrf_exempt(views.log_in), name='log-in') ,  
    path('sign-up/', views.sign_up, name='sign-up'),
    path('user-profile/', views.UpdateProfileView.as_view(), name='user-profile'),
    path('add-address/', views.add_address, name='add-address'),
    # path('update-user-profile/', views.update_user_profile, name='update-user-profile'),
    # path('get-user-details/', views.get_user_details, name="get-userDetails"),
    # path('test-user-create/', views.UpdateProfileView.as_view(), name='test-profile-update')
]