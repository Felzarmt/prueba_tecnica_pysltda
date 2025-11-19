# Respuestas a Preguntas Teóricas

## 1. Ventajas del ORM

Es una herramienta que permite trabajar con bases de datos usando objetos Python en lugar de SQL directo.

Principales ventajas:
- Seguridad: Protege contra SQL Injection automáticamente
- Independencia de BD Cambiar de SQLite a PostgreSQL sin reescribir código
- Código limpio: Python puro en lugar de strings SQL
- Relaciones automáticas: Maneja ForeignKey, ManyToMany fácilmente
- Migraciones: Controla cambios en la estructura de la BD
- Validación integrada: Los campos se validan antes de guardar

Ejemplo:
```python
# Sin ORM (vulnerable a SQL Injection)
cursor.execute("SELECT * FROM carro WHERE placa = '" + placa + "'")

# Con Django ORM (seguro)
carro = Carro.objects.filter(placa=placa).first()
```

---

## 2. Diferencia entre Estado (State) y Props
La diferencia clave entre **State** y **Props** en React es el **origen de los datos** y la **mutabilidad**.

---

| Característica | **Props (Propiedades)** | **State (Estado)** |
| :--- | :--- | :--- |
| **Origen** | Vienen de **fuera** (pasadas por el componente **padre**). | Vienen de **adentro** (gestionadas por el componente mismo). |
| **Mutabilidad** | Son **inmutables** (solo lectura). No se pueden cambiar. | Son **mutables**. Están diseñadas para cambiar con el tiempo (e.g., por un clic). |
| **Flujo** | Comunicación **unidireccional** (Padre → Hijo). | Comunicación **interna** del componente. |
| **Analogía** | Las **instrucciones** iniciales de uso. | La **memoria** interna del componente. |

En resumen: **Las Props son para la configuración inicial, y el State es para la interactividad y los cambios internos.**

## 3. Importancia de los Códigos HTTP

Son la forma estándar del servidor para comunicar el resultado de una solicitud.

Códigos principales:

| Código | Significado | Acción |
|--------|-----------|--------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado |
| 204 | No Content | Exitoso, sin respuesta |
| 400 | Bad Request | Datos inválidos |
| 401 | Unauthorized | Sin autenticación |
| 403 | Forbidden | Sin permisos |
| 404 | Not Found | Recurso no existe |
| 500 | Server Error | Error del servidor |

En este proyecto:
```typescript
// Manejo según el código HTTP
if (error.response?.status === 401) {
  navigate('/login'); // Sin token, volver a login
} else if (error.response?.status === 404) {
  console.error('Recurso no encontrado');
} else if (error.response?.status === 500) {
  console.error('Error del servidor');
}
```

Por qué son importantes:
- ✅ Estandarizan la comunicación cliente-servidor
- ✅ Permiten manejo de errores específico
- ✅ Facilitan debugging
- ✅ Base de cualquier API REST

