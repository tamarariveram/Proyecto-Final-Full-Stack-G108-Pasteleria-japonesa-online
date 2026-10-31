# Kashi · Dependencias del proyecto

Proyecto Final G108 · Hito 1 - Diseño y prototipo · Tamara Rivera

> Versión con diseño: [`Dependencias.pdf`](./Dependencias.pdf)

## Frontend (React + Vite)

Proyecto creado con `npm create vite@latest kashi-frontend -- --template react`

| Dependencia | Tipo | Para qué se usa en Kashi |
|---|---|---|
| `react` / `react-dom` | Producción | Librería base de la interfaz (vienen con Vite) |
| `react-router-dom` | Producción | Rutas de las vistas, `Link`, `useNavigate` y rutas protegidas |
| `axios` | Producción | Peticiones HTTP a la API REST |
| `bootstrap` | Producción | Grilla, utilidades y estilos base responsive |
| `react-bootstrap` | Producción | Componentes de Bootstrap como componentes React (Navbar, Card, Modal, Form) |
| `sweetalert2` | Producción | Alertas de confirmación ("¿Eliminar producto?", "¡Compra realizada!") |
| `framer-motion` | Producción | Animaciones suaves de entrada y transiciones |
| `vite` | Desarrollo | Servidor de desarrollo y build |

> El estado global (usuario logueado y carrito) se maneja con **Context API**, incluida en React (no requiere instalación).

```bash
npm install react-router-dom axios bootstrap react-bootstrap sweetalert2 framer-motion
```

## Backend (Node.js + Express)

Proyecto creado con `npm init -y`

| Dependencia | Tipo | Para qué se usa en Kashi |
|---|---|---|
| `express` | Producción | Servidor y rutas de la API REST |
| `pg` | Producción | Conexión y consultas a PostgreSQL |
| `pg-format` | Producción | Construir consultas dinámicas de forma segura (filtros de la galería) |
| `bcryptjs` | Producción | Encriptar y comparar contraseñas |
| `jsonwebtoken` | Producción | Firmar y verificar tokens JWT |
| `cors` | Producción | Permitir peticiones desde el frontend (otro origen) |
| `dotenv` | Producción | Variables de entorno (credenciales de BD, secreto JWT) |
| `nodemon` | Desarrollo | Reiniciar el servidor automáticamente al guardar |
| `jest` | Desarrollo | Framework de testing |
| `supertest` | Desarrollo | Probar las rutas de la API con peticiones HTTP |

```bash
npm install express pg pg-format bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon jest supertest
```

## Base de datos y despliegue

| Herramienta | Uso |
|---|---|
| PostgreSQL | Base de datos relacional |
| Render | Despliegue del frontend y del backend |
| Supabase / Neon | Base de datos PostgreSQL online |
