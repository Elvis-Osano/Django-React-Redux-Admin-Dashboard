from rest_framework import serializers
from .models import Branch


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Branch
        fields=('name','sale')