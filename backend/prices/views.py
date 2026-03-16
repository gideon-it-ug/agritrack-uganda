from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['GET'])
def get_prices(request):
    prices = [
        {"id": 1, "crop": "Maize", "district":"Kampala", "price": 1200},
        {"id": 2, "crop": "Beans", "district":"Gulu", "price": 3500},
        {"id": 3, "crop": "Cassava", "district":"Mbale", "price": 800},
        {"id": 4, "crop": "Rice", "district":"Lira", "price": 2800},
        ]
    return Response(prices)
