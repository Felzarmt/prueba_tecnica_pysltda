from django.db import models

class ViajeManager(models.Manager):
    def por_placa(self, placa):
        return self.filter(carro__placa=placa).select_related(
            'carro', 'ciudad_origen', 'ciudad_destino'
        )

class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Carro(models.Model):
    placa = models.CharField(max_length=10, unique=True)
    color = models.CharField(max_length=50)
    fecha_ingreso = models.DateField()

    def __str__(self):
        return f"{self.placa} - {self.color}"

class Viaje(models.Model):
    carro = models.ForeignKey(Carro, on_delete=models.CASCADE, related_name='viajes')
    ciudad_origen = models.ForeignKey(Ciudad, on_delete=models.PROTECT, related_name='viajes_origen')
    ciudad_destino = models.ForeignKey(Ciudad, on_delete=models.PROTECT, related_name='viajes_destino')

    tiempo_horas = models.PositiveIntegerField()
    fecha = models.DateField()

    objects = ViajeManager()

    def __str__(self):
        return f"Viaje {self.carro.placa}"