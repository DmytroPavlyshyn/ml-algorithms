from django.urls import path

from . import views
from .views import create_user

app_name = 'auth'

urlpatterns = [
    # ex: /polls/
    path('user', create_user, name='user'),

]

