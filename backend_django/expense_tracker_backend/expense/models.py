from unicodedata import category
from django.db import models


class Category(models.Model):
    
    name =              models.CharField(max_length=250)

    def __str__(self):
        return self.name
    
    
class SubCategory(models.Model):
    
    name =              models.CharField(max_length=250)
    category =          models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sub_categories')
    
    def __str__(self):
        return self.name
    

    

class PaymentType(models.Model):
    
    name =              models.CharField(max_length=250)
    
    def __str__(self):
        return self.name
    
class Payment(models.Model):
    
    category =          models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    sub_category =      models.ForeignKey(SubCategory, on_delete=models.DO_NOTHING)
    amount =            models.DecimalField(max_digits=10, decimal_places=2)
    created_at =        models.DateTimeField(auto_now_add=True)
    payment_type =      models.ForeignKey(PaymentType, on_delete=models.DO_NOTHING)
    
    
    
       

