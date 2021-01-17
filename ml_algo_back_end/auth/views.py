from django.contrib.auth.models import User
from rest_framework import viewsets

from . import serializers
from .permissions import ReadOnly


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (ReadOnly,)
