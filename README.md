# Gestión de Viajes - Full Stack

Sistema de gestión de viajes y carros con Django REST Framework + React TypeScript.

---

## 🚀 Inicio Rápido

### Backend (Django)

```bash
cd backend

# Entorno virtual (Windows)
python -m venv venv
venv\Scripts\activate

# Dependencias
pip install django djangorestframework django-cors-headers

# Migraciones
python manage.py migrate

# Superusuario
user:     admin
password: pipE123456*

# Servidor
python manage.py runserver
```

**URL**: `http://localhost:8000`

---

### Frontend (React)

```bash
cd frontend

# Dependencias
npm install

# Servidor desarrollo
npm run dev
```

**URL**: `http://localhost:5173`

---

## Características

- Autenticación con tokens  
- CRUD de carros y viajes  
- Validaciones en tiempo real  
- Interfaz responsive con Tailwind CSS  
- TypeScript para tipado estático  

---

## Credenciales de Prueba

- **Usuario**: admin
- **Contraseña**: admin123


## Endpoints API

```
POST   /auth/login/              → Iniciar sesión
GET    /transport/carros/        → Listar carros
POST   /transport/carros/        → Crear carro
GET    /transport/viajes/        → Listar viajes
POST   /transport/viajes/        → Crear viaje
GET    /transport/ciudades/      → Listar ciudades
```