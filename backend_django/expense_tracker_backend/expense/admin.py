from django.contrib import admin
from expense.models import *

# Register your models here.

admin.site.register(Category)

admin.site.register(SubCategory)

admin.site.register(PaymentType)

admin.site.register(Payment)

