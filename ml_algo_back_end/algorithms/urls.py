from django.urls import path

from . import views

app_name = 'algorithms'

urlpatterns = [
    # ex: /polls/
    path('grrn', views.process_grrn, name='grrn'),
    path('svr', views.process_svr, name='svr'),
    path('sgd', views.process_sgd, name='sgd'),
    path('ada-boost', views.process_ada_boost, name='ada-boost'),
    path('random-forest', views.process_random_forest, name='random-forest'),
    path('mlp', views.process_mlp, name='mlp'),
]

