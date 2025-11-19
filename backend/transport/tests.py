from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Carro, Ciudad, Viaje

class TransportTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='tester', password='123')
        self.token = Token.objects.create(user=self.user)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.ciudad_a = Ciudad.objects.create(nombre="Bogotá")
        self.ciudad_b = Ciudad.objects.create(nombre="Medellín")

    def test_login_exitoso(self):
        self.client.logout()
        data = {"username": "tester", "password": "123"}
        response = self.client.post('/api/login/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_fallido(self):
        self.client.logout()
        data = {"username": "tester", "password": "incorrecta"}
        response = self.client.post('/api/login/', data)
        self.assertTrue(response.status_code in [400, 401])

    def test_crear_carro(self):
        data = {
            "placa": "AAA111",
            "color": "Rojo",
            "fecha_ingreso": "2023-01-01"
        }
        response = self.client.post('/api/carros/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_carro_placa_duplicada(self):
        Carro.objects.create(placa="AAA111", color="Azul", fecha_ingreso="2023-01-01")
        data = {"placa": "AAA111", "color": "Verde", "fecha_ingreso": "2023-02-01"}
        response = self.client.post('/api/carros/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_crear_viaje_tiempo_invalido(self):
        carro = Carro.objects.create(placa="BBB222", color="Negro", fecha_ingreso="2023-01-01")
        data = {
            "carro": carro.id,
            "ciudad_origen": self.ciudad_a.id,
            "ciudad_destino": self.ciudad_b.id,
            "tiempo_horas": 0,
            "fecha": "2023-11-20"
        }
        response = self.client.post('/api/viajes/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_filtrar_viajes_por_placa(self):
        carro1 = Carro.objects.create(placa="CARRO1", color="A", fecha_ingreso="2023-01-01")
        carro2 = Carro.objects.create(placa="CARRO2", color="B", fecha_ingreso="2023-01-01")

        Viaje.objects.create(carro=carro1, ciudad_origen=self.ciudad_a, ciudad_destino=self.ciudad_b, tiempo_horas=5,
                             fecha="2023-11-01")
        Viaje.objects.create(carro=carro2, ciudad_origen=self.ciudad_b, ciudad_destino=self.ciudad_a, tiempo_horas=5,
                             fecha="2023-11-02")

        response = self.client.get('/api/viajes/?placa=CARRO1')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['carro'], carro1.id)