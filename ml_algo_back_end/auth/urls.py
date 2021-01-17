from django.urls import path

from . import views

app_name = 'auth'

urlpatterns = [
    # ex: /polls/
    path('user', views.UserViewSet.as_view, name='user'),

]

