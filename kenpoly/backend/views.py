from django.shortcuts import render
from rest_framework import views,permissions
from .models import Branch
from .serializers import PostSerializer
from rest_framework.response import Response


# Create your views here.
class Api(views.APIView):
    serializer_class = PostSerializer
    

    def get(self, request):
        output = [{"name": output.name, "sale": output.sale}
                  for output in Branch.objects.all()]
        return Response(output)

    def post(self, request):

        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    