from django.urls import path
from rest_framework.routers import DefaultRouter
from expense.views import *

router = DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'sub_category', SubCategoryViewSet)
router.register(r'payment_type', PaymentTypeViewSet)
router.register(r'payment', PaymentViewSet)
urlpatterns = router.urls