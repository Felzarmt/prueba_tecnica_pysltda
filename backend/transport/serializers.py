from rest_framework import serializers
from .models import Carro, Viaje, Ciudad

class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'

class CarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = '__all__'

class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = '__all__'

    @staticmethod
    def validate_tiempo_horas(value):
        if value <= 0:
            raise serializers.ValidationError("El tiempo debe ser mayor a 0.")
        return value