from django.urls import path

from . import views

app_name = 'visualize'

urlpatterns = [
    # TODO
    path('plot', views.plot, name='plot'),

]

