from django.contrib import admin
from .models import Carro, Ciudad, Viaje

@admin.register(Ciudad)
class CiudadAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'activo')

@admin.register(Carro)
class CarroAdmin(admin.ModelAdmin):
    list_display = ('placa', 'color', 'fecha_ingreso')
    search_fields = ('placa',)

@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ('carro', 'ciudad_origen', 'ciudad_destino', 'fecha', 'tiempo_horas')
    list_filter = ('fecha', 'ciudad_origen')