# Kashi · Dependencias del proyecto

Proyecto Final G108 · Tamara Rivera · Actualizado en el Hito 2

> Versión con diseño: [`Dependencias.pdf`](./Dependencias.pdf)

## Frontend (React + Vite)

Proyecto creado con `npm create vite@latest frontend -- --template react`

| Dependencia | Tipo | Para qué se usa en Kashi |
|---|---|---|
| `react` / `react-dom` | Producción | Librería base de la interfaz (vienen con Vite) |
| `react-router-dom` | Producción | Rutas de las vistas, `Link`, `useNavigate` y rutas protegidas |
| `fetch` | Incluido | Peticiones HTTP a la API REST (viene con JavaScript, no se instala) |
| `bootstrap` | Producción | Grilla, utilidades y estilos base responsive |
| `react-bootstrap` | Producción | Componentes de Bootstrap como componentes React (Navbar, Card, Table, Form) |
| `sweetalert2` | Producción | Alertas de confirmación ("¿Eliminar producto?", "¡Gracias por tu compra!") |
| `eslint` | Desarrollo | Revisa el código y avisa errores (viene con Vite) |
| `vite` | Desarrollo | Servidor de desarrollo y build |

> El estado global (sesión, productos, pedidos y carrito) se maneja con **Context API**, y las peticiones a la API se harán con **`fetch`**. Los dos vienen incluidos (no requieren instalación).

```bash
npm install react-router-dom bootstrap react-bootstrap sweetalert2
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
| Vercel / Render | Despliegue del frontend (Vercel) y del backend (Render) |
| Supabase / Neon | Base de datos PostgreSQL online |
