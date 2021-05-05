import json

from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from algorithms.file_utils import FileUtils
from .core import plot as _plot


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes((JSONWebTokenAuthentication,))
def plot(request):
    plt = _plot(FileUtils.build_path(request.GET.get("actualDataPath"), request.user),
                request.GET.get("predictedDataPath")
                )

    response = HttpResponse(content_type="image/png")
    plt.savefig(response, format='png')
    return response
