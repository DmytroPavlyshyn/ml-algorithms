import json

from django.http import HttpResponse

from .core import plot as _plot


def plot(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        parsed_body = json.loads(request.body)
        plt = _plot(parsed_body['file'])

        response = HttpResponse(content_type="image/png")
        plt.savefig(response, format='png')
        return response
