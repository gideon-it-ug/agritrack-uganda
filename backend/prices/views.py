from rest_framework.decorators import api_view
from rest_framework.response import Response
from prices.models import Price

@api_view(['GET'])
def get_prices(request):
    prices = Price.objects.all()
    data = [{'id': p.id, 'crop': p.crop, 'district': p.district, 'price': p.price} for p in prices]
    return Response(data)
