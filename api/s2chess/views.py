import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict

from .models import OpeningMove


def test(request):
    json_object = {'status': 's2-chess READY'}
    return JsonResponse(json_object)


@csrf_exempt
def opening(request):
    print('DATA', request.body)
    move_id = json.loads(request.body)['move']['id']
    moves = OpeningMove.objects.filter(previous_move=move_id)
    return JsonResponse([
        model_to_dict(move) for move in moves
    ], safe=False)
