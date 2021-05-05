from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import viewsets
from rest_framework.status import HTTP_200_OK

from . import serializers
from .permissions import ReadOnly
import json

# Create your views here.
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    # queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    # permission_classes = (ReadOnly,)
    # def list(self, request, *args, **kwargs):
    def create(self, request, *args, **kwargs):
        print("SMTH")


def create_user(request):
    user = UserSerializer(data=json.loads(request.body))
    if user.is_valid():
        saved = User.objects.create_user(**user.data)
        return HttpResponse(json.dumps({"id": saved.id}))
    return HttpResponseBadRequest()
