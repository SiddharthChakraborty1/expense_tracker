from unicodedata import name
from django.shortcuts import render
from django.db.models import Q, F
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from expense.models import *
from expense.serializers import *



class CategoryViewSet(ModelViewSet):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ['get']
    
class SubCategoryViewSet(ModelViewSet):
    
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()
    http_method_names = ['get']
    
    @action(detail=False, methods=['get'], name='subcategory_by_category')
    def subcategory_by_category(self, request):
        query_params = request.query_params
        if 'category_id' not in query_params.keys():
            return Response({
                'error': 'no category provided'
            }, status=status.HTTP_400_BAD_REQUEST)
        category_id = query_params.get('category_id')
        sub_categories = SubCategory.objects.filter(category__id=category_id)
        serialized = SubCategorySerializer(sub_categories, many=True)
        return Response({
            'sub_categories': serialized.data
        }, status=status.HTTP_200_OK)
        
class PaymentTypeViewSet(ModelViewSet):
    
    serializer_class = PaymentTypeSerializer
    queryset = PaymentType.objects.all()
    http_method_names = ['get']
    
class PaymentViewSet(ModelViewSet):
    
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
        
        
