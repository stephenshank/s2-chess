from django.http import JsonResponse


def test(request):
    json_object = {'result': 1}
    return JsonResponse(json_object)

