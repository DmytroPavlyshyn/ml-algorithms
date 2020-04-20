from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from .forms import *
from .core import *
import json



def process_grrn(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = GrrnForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = GRRNProcessor()
            stats = "response"
            #     processor.process(
            #     **form.cleaned_data
            # )
            return JsonResponse(stats, safe=False)
    return HttpResponseBadRequest


def process_svr(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = SvrForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = SVRProcessor()
            stats = processor.process(
                **form.cleaned_data
            )
            return JsonResponse(stats, safe=False)

    # TODO fix checkbox false value
    return HttpResponseBadRequest


def process_sgd(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = SgdForm(parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = SGDProcessor()
            stats = processor.process(
                **form.cleaned_data
            )
            return JsonResponse(stats, safe=False)
    return HttpResponseBadRequest()


def process_ada_boost(request):
    # if this is a POST request we need to process the form data
    form = None
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = AdaBoostForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = AdaBoostProcessor()
            stats = processor.process(
                **form.cleaned_data
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest("BAD REQUEST ERRORS: %s" % form._errors)


def process_random_forest(request):
    # if this is a POST request we need to process the form data
    form = None
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = RandomForestForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            processor = RandomForestProcessor()
            stats = processor.process(
                **form.cleaned_data
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest("BAD REQUEST ERRORS: %s" % form.errors)


def process_mlp(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)

        form = MlpForm(data=parsed_body)
        # check whether it's valid:
        if form.is_valid():
            form.cleaned_data['hidden_layer_sizes'] = tuple(form.cleaned_data['hidden_layer_sizes'])
            processor = MLPProcessor()
            stats = processor.process(
                **form.cleaned_data
            )
            return JsonResponse(stats, safe=False)

    return HttpResponseBadRequest


def try_cast(_fun, _el: str):
    try:
        return _fun(_el)
    except ValueError:
        return None
