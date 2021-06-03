# Create your views here.

import json
import os
from os import listdir
from os.path import join

from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .core import *
from .forms import *
from .serializers import *
from .translators import *


# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_grrn(request):
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = GrrnForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         processor = GRRNProcessor()
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#     return HttpResponseBadRequest()
#
#
# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_svr(request):
#     # if this is a POST request we need to process the form data
#     # create a form instance and populate it with data from the request:
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = SvrForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         translate_svr(form)
#         processor = SVRProcessor()
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#
#     return HttpResponseBadRequest()
#
#
# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_sgd(request):
#     # if this is a POST request we need to process the form data
#     # create a form instance and populate it with data from the request:
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = SgdForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         translate_sgd(form)
#         processor = SGDProcessor()
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#     return HttpResponseBadRequest()
#
#
# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_ada_boost(request):
#     # if this is a POST request we need to process the form data
#     # create a form instance and populate it with data from the request:
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = AdaBoostForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         translate_ada_boost(form)
#         processor = AdaBoostProcessor()
#
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#
#     return HttpResponseBadRequest()
#
#
# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_random_forest(request):
#     # if this is a POST request we need to process the form data
#     # create a form instance and populate it with data from the request:
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = RandomForestForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         translate_random_forest(form)
#         processor = RandomForestProcessor()
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#
#     return HttpResponseBadRequest()
#
#
# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
# def process_mlp(request):
#     # if this is a POST request we need to process the form data
#     # create a form instance and populate it with data from the request:
#     parsed_body = json.loads(request.body)
#     print(str(request.body))
#
#     form = MlpForm(data=parsed_body)
#     # check whether it's valid:
#     if form.is_valid():
#         translate_mlp(form)
#         processor = MLPProcessor()
#         stats = processor.process(
#             **filter_null(form.validated_data)
#         )
#         return JsonResponse(stats, safe=False)
#
#     return HttpResponseBadRequest()

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def process_generic_algo(request):
    # if this is a POST request we need to process the form data
    # create a form instance and populate it with data from the request:
    parsed_body = json.loads(json.loads(request.body))

    stats = GenericProcessor().process(parsed_body, request.user)
    return JsonResponse(stats, safe=False)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def upload_file(request):
    form = DocumentForm(request.POST, request.FILES)
    if form.is_valid():
        print(settings.MEDIA_ROOT)
        f = request.FILES['file']

        user_folder = f"{settings.UPLOADS_ROOT}/{request.user.username}";
        if not os.path.exists(user_folder):
            os.makedirs(user_folder)

        with open(f"{user_folder}/{f.name}", 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
        return HttpResponse('OK')
    return HttpResponseBadRequest()


# @api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes((JSONWebTokenAuthentication,))
def download_file(request):
    path = request.GET['path']

    if os.path.exists(path):
        with open(path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="text/csv")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(path)
            return response
    return HttpResponseBadRequest()


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def list_uploads(request):
    user_folder = f"{settings.UPLOADS_ROOT}/{request.user.username}";
    if os.path.exists(user_folder):
        files = [f for f in listdir(user_folder)]
    else:
        files = []
    return JsonResponse({'files': files})


def filter_null(kwargs):
    return {k: v for k, v in kwargs.items() if v is not None}
