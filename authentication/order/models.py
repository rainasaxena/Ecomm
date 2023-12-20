# from django.db import models
# from django.contrib.auth.models import User

# # Create your models here.
# class Order(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     items = models.ManyToManyField()
#     ordered_date = models.DateTimeField();
#     ordered = models.BooleanField(default=False)
#     coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, blank=True, null= True)
    

    


# class Coupon (models.Model):
#     code = models.CharField(max_length=15)
#     amount = models.FloatField()

#     def __str__ (self):
#         return self.code


