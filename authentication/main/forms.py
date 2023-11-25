from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import userProfile

class RegisterForm(UserCreationForm):
    email=forms.EmailField(required=True)

    class Meta:
        model=User
        fields=["username", "email", "password1", "password2"]

class UpdateUserProfileForm(forms.ModelForm):
    class Meta:
        model = userProfile
        fields = ['user_pfp', 'user_gender']
