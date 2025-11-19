from rest_framework import generics
from .models import Carro, Viaje, Ciudad
from .serializers import CarroSerializer, ViajeSerializer, CiudadSerializer

class CarroListCreateView(generics.ListCreateAPIView):
    queryset = Carro.objects.all()
    serializer_class = CarroSerializer

class ViajeListCreateView(generics.ListCreateAPIView):
    serializer_class = ViajeSerializer

    def get_queryset(self):
        placa = self.request.query_params.get('placa')
        if placa:
            return Viaje.objects.por_placa(placa)
        return Viaje.objects.all()

class CiudadListView(generics.ListAPIView):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer

