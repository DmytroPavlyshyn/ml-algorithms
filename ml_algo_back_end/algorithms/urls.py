from django.urls import path

from . import views

app_name = 'algorithms'

urlpatterns = [
    # ex: /polls/
    path('process', views.process_generic_algo, name='process'),
    path('file', views.download_file, name='file'),
    path('list-uploads', views.list_uploads, name='list-uploads'),
    path('upload', views.upload_file, name='upload'),
]

