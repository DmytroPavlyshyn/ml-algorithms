# Create your views here.

import json
import os
from os import listdir
from os.path import join

from django.contrib.auth.decorators import permission_required
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .core import *
from .forms import *
from .serializers import *
from .translators import *


@permission_classes((IsAuthenticated, ))
def process_grrn(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = GrrnForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = GRRNProcessor()
            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)
    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_svr(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = SvrForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            translate_svr(form)
            processor = SVRProcessor()
            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)

    # TODO fix checkbox false value
    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_sgd(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = SgdForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            translate_sgd(form)
            processor = SGDProcessor()
            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)
    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_ada_boost(request):
    # if this is a POST request we need to process the form data
    form = None
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = AdaBoostForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            translate_ada_boost(form)
            processor = AdaBoostProcessor()

            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_random_forest(request):
    # if this is a POST request we need to process the form data
    form = None
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = RandomForestForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            translate_random_forest(form)
            processor = RandomForestProcessor()
            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_mlp(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        print(str(request.body))

        form = MlpForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            translate_mlp(form)
            processor = MLPProcessor()
            stats = processor.process(
                **filter_null(form.validated_data)
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def process_all_algos(request):
    all_propcessors = {
        "grrn": {'form': GrrnForm, 'translator': translate_grrm},
        "svr": {'form': SvrForm, 'translator': translate_svr},
        "sgd": {'form': SgdForm, 'translator': translate_sgd},
        "ada-boost": {'form': AdaBoostForm, 'translator': translate_ada_boost},
        "random-forest": {'form': RandomForestForm, 'translator': translate_random_forest},
        "mlp": {'form': MlpForm, 'translator': translate_mlp}
    }
    processor = AllAlgorithmsProcessor()
    if request.method == 'POST':
        validation_results = []
        validated_data = {}
        parsed_body = json.loads(request.body)
        for key, value in all_propcessors.items():
            record = value['form'](data=parsed_body[key])
            is_valid = record.is_valid()
            validated_data[key] = filter_null(value['translator'](record).validated_data)
            validation_results.append(is_valid)
        print(validation_results)
        if all(validation_results):
            stats = processor.process(**validated_data)
            return JsonResponse(stats, safe=False)
    return HttpResponseBadRequest()


# @permission_classes((IsAuthenticated, ))
def upload_file(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            print(settings.MEDIA_ROOT)
            handle_uploaded_file(request.FILES['file'])
            return HttpResponse('OK')
    return HttpResponseBadRequest()


def handle_uploaded_file(f):
    with open(f"{settings.MEDIA_ROOT}/uploads/{f.name}", 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


@permission_classes((IsAuthenticated, ))
def download_file(request):
    path = request.GET['path']

    if os.path.exists(path):
        with open(path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="text/csv")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(path)
            return response
    return HttpResponseBadRequest()


@permission_classes((IsAuthenticated, ))
def list_uploads(request):
    files = [join(settings.UPLOADS_ROOT, f) for f in listdir(settings.UPLOADS_ROOT)]
    return JsonResponse({'files': files})


def filter_null(kwargs):
    return {k: v for k, v in kwargs.items() if v is not None}


def try_cast(_fun, _el: str):
    if _el is None:
        return None
    try:
        return _fun(_el)
    except ValueError:
        return None


def map_try_cast(field, fun_list):
    for fun in fun_list:
        result = try_cast(fun, field)
        if result is not None:
            return result
    return None


def to_bool(string):
    if string == 'true':
        return True
    elif string == 'false':
        return False
    else:
        raise ValueError
