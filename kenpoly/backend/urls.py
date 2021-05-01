from django.urls import path
from .views import Api

urlpatterns=[
    path("",Api.as_view())
]