from .models import UserAddress, userProfile

def create_user_profile_object(user, data):
    userProfileObj = userProfile(user=user, user_gender=data['user_gender'], user_pfp=data['user_pfp'])
    return userProfileObj

def create_user_address_object(userProfileObj, data):
    userAddressObj = UserAddress(user_profile=userProfileObj, address_type=data['address_type'], address_line1=data['address_line1'], address_line2=data['address_line2'], city=data['city'], state=data['state'], country=data['country'], postal_code=data['postal_code'])
    return userAddressObj