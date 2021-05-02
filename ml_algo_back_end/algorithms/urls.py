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
    path('process', views.process_generic_algo, name='process'),
    path('mlp', views.process_mlp, name='mlp'),
    path('all', views.process_all_algos, name='all'),
    path('file', views.download_file, name='file'),
    path('list-uploads', views.list_uploads, name='list-uploads'),
    path('upload', views.upload_file, name='upload'),
]

