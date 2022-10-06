from rest_framework.serializers import ModelSerializer
from expense.models import *

class CategorySerializer(ModelSerializer):
    
    class Meta:
        fields = '__all__'
        model = Category

        
class SubCategorySerializer(ModelSerializer):
    
    class Meta:
        fields = '__all__'
        model = SubCategory
        

class PaymentTypeSerializer(ModelSerializer):
    
    class Meta:
        fields = '__all__'
        model = PaymentType


class PaymentSerializer(ModelSerializer):
    
    class Meta:
        fields = '__all__'
        model = Payment

class PaymentSerializerReadOnly(ModelSerializer):
    
        class Meta:
            fields = '__all__'
            model = Payment
            depth = 1
    
        
