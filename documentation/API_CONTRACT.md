# Kashi · Contrato de la API REST

Proyecto Final G108 · Hito 1 · Tamara Rivera

Versión PDF: [`API_CONTRACT.pdf`](./API_CONTRACT.pdf)

## Datos generales

- URL base: `http://localhost:3000/api`
- Las rutas privadas necesitan el header `Authorization: Bearer <token>`
- Los errores responden `{ "message": "..." }`
- Los precios van en pesos chilenos, sin decimales

**Accesos**

- **Público:** no necesita token
- **Cliente:** necesita token
- **Admin:** necesita token y `rol: "admin"`

---

## Auth

### POST /api/auth/register

Acceso: público. El usuario se crea siempre como `cliente`.

Envía:

```json
{
  "nombre": "Tamara Rivera",
  "email": "tamara@correo.cl",
  "password": "MiClave123"
}
```

Responde `201`:

```json
{
  "id": "6f1c2a9e-3b4d-4c8a-9e21-7a5b3c1d2e4f",
  "nombre": "Tamara Rivera",
  "email": "tamara@correo.cl",
  "rol": "cliente"
}
```

Errores: `400` faltan datos · `409` el email ya existe

### POST /api/auth/login

Acceso: público.

Envía:

```json
{
  "email": "tamara@correo.cl",
  "password": "MiClave123"
}
```

Responde `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "6f1c2a9e-3b4d-4c8a-9e21-7a5b3c1d2e4f",
    "nombre": "Tamara Rivera",
    "email": "tamara@correo.cl",
    "rol": "cliente"
  }
}
```

Errores: `400` faltan datos · `401` email o contraseña incorrectos

### GET /api/auth/me

Acceso: cliente. Devuelve los datos del usuario logueado (Mi perfil).

Responde `200`:

```json
{
  "id": "6f1c2a9e-3b4d-4c8a-9e21-7a5b3c1d2e4f",
  "nombre": "Tamara Rivera",
  "email": "tamara@correo.cl",
  "rol": "cliente",
  "created_at": "2026-10-30T22:15:00.000Z"
}
```

Errores: `401` sin token o token inválido

---

## Categorías

### GET /api/categorias

Acceso: público. Para el filtro de la tienda y el select del formulario.

Responde `200`:

```json
[
  { "id": "b2e8...", "nombre": "Mochi" },
  { "id": "c4f1...", "nombre": "Dorayaki" },
  { "id": "d7a3...", "nombre": "Daifuku" },
  { "id": "e9b5...", "nombre": "Té y matcha" },
  { "id": "f1c6...", "nombre": "Cajas de regalo" }
]
```

---

## Productos

### GET /api/productos

Acceso: público. Filtros opcionales: `?categoria=Mochi` (tienda) y `?destacado=true` (home).

Responde `200`:

```json
[
  {
    "id": "a3f9c2e1-5d7b-4e2a-8c1f-9b6d4e3a2c10",
    "nombre": "Mochi de matcha",
    "descripcion": "Masa de arroz glutinoso rellena de crema de matcha.",
    "precio": 2500,
    "imagen_url": "https://images.unsplash.com/mochi-matcha.jpg",
    "stock": 30,
    "destacado": true,
    "categoria": { "id": "b2e8...", "nombre": "Mochi" }
  }
]
```

### GET /api/productos/:id

Acceso: público. Responde `200` con un producto (mismo formato de arriba).

Errores: `404` no existe

### POST /api/productos

Acceso: admin.

Envía:

```json
{
  "nombre": "Dorayaki de matcha",
  "descripcion": "Dorayaki relleno de anko y crema de matcha.",
  "precio": 3300,
  "imagen_url": "https://images.unsplash.com/dorayaki-matcha.jpg",
  "stock": 20,
  "destacado": false,
  "categoria_id": "c4f1..."
}
```

Responde `201` con el producto creado.

Errores: `400` datos inválidos · `401` sin token · `403` no es admin

### PUT /api/productos/:id

Acceso: admin. Envía el producto completo (igual que el POST) y responde `200` con el producto actualizado.

Errores: `400` · `401` · `403` · `404`

### DELETE /api/productos/:id

Acceso: admin.

Responde `200`:

```json
{ "message": "Producto eliminado correctamente" }
```

Errores: `401` · `403` · `404` · `409` el producto ya tiene pedidos (mejor dejar el stock en 0)

---

## Pedidos

### POST /api/pedidos

Acceso: cliente. Se llama al apretar "Pagar" en el carrito.

El frontend manda solo los ids y cantidades. El precio lo busca el backend en la base de datos, así nadie puede cambiarlo desde el navegador. También guarda el `precio_unitario` y descuenta el stock.

Envía:

```json
{
  "items": [
    { "producto_id": "a3f9c2e1-5d7b-4e2a-8c1f-9b6d4e3a2c10", "cantidad": 2 },
    { "producto_id": "7d2b9f4a-1c3e-4a5b-9d8c-2e1f6a7b8c90", "cantidad": 1 }
  ]
}
```

Responde `201`:

```json
{
  "id": "9c8b7a6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d",
  "total": 8000,
  "estado": "pendiente",
  "created_at": "2026-10-30T23:05:00.000Z",
  "items": [
    { "producto_id": "a3f9...", "nombre": "Mochi de matcha", "cantidad": 2, "precio_unitario": 2500, "subtotal": 5000 },
    { "producto_id": "7d2b...", "nombre": "Dorayaki clásico", "cantidad": 1, "precio_unitario": 3000, "subtotal": 3000 }
  ]
}
```

Errores: `400` carrito vacío o sin stock · `401` sin token · `404` algún producto no existe

### GET /api/pedidos/mis-pedidos

Acceso: cliente. Pedidos del usuario logueado (Mi perfil), del más nuevo al más antiguo. Mismo formato que la respuesta del POST.

Errores: `401`

### GET /api/pedidos

Acceso: admin. Todos los pedidos de la tienda. Cada pedido trae además `usuario: { id, nombre, email }`.

Errores: `401` · `403`

---

## Resumen

| Método | Ruta | Acceso | Vista |
|---|---|---|---|
| POST | /api/auth/register | Público | Registro |
| POST | /api/auth/login | Público | Login |
| GET | /api/auth/me | Cliente | Mi perfil |
| GET | /api/categorias | Público | Tienda, Formulario |
| GET | /api/productos | Público | Home, Tienda |
| GET | /api/productos/:id | Público | Detalle, Formulario |
| POST | /api/productos | Admin | Formulario |
| PUT | /api/productos/:id | Admin | Formulario |
| DELETE | /api/productos/:id | Admin | Panel admin |
| POST | /api/pedidos | Cliente | Carrito |
| GET | /api/pedidos/mis-pedidos | Cliente | Mi perfil |
| GET | /api/pedidos | Admin | Pedidos admin |
