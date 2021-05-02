import json

from django.http import HttpResponse

from .core import plot as _plot


def plot(request):
    plt = _plot(request.GET.get("actualDataPath"), request.GET.get("predictedDataPath"))

    response = HttpResponse(content_type="image/png")
    plt.savefig(response, format='png')
    return response
