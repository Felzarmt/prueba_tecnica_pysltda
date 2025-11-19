from django.urls import path
from .views import CarroListCreateView, ViajeListCreateView, CiudadListView

urlpatterns = [
    path('carros/', CarroListCreateView.as_view(), name='carros-list-create'),
    path('viajes/', ViajeListCreateView.as_view(), name='viajes-list-create'),
    path('ciudades/', CiudadListView.as_view(), name='ciudades-list'),
]