# Kashi - Pastelería japonesa online

Proyecto Final · Desarrollo Full Stack JavaScript · Desafío Latam G108
Autora: Tamara Rivera

## El proyecto

**Kashi** es una tienda online de wagashi (dulces tradicionales japoneses: mochi, dorayaki, daifuku, té y matcha). Funciona como marketplace de vendedor único:

- **Clientes:** navegan el catálogo, filtran por categoría, agregan productos al carrito, compran y revisan su historial de pedidos.
- **Administradora:** crea, edita y elimina productos, y revisa todos los pedidos de la tienda.

**Problema que resuelve:** una pastelería pequeña que hoy vende solo por mensajes de Instagram necesita un catálogo siempre actualizado y una forma ordenada de recibir y registrar pedidos.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite, React Router, Context API, Axios, Bootstrap |
| Backend | Node.js, Express, JWT, bcryptjs |
| Base de datos | PostgreSQL |
| Testing | Jest + Supertest |
| Despliegue | Render + PostgreSQL online |

## Hito 1 · Diseño y prototipo

Todo el material está en la carpeta [`documentation`](./documentation):

| # | Requerimiento | Archivo |
|---|---|---|
| 1 | Boceto de las vistas | [`wireframes/`](./documentation/wireframes) (11 vistas) · [archivo editable en Excalidraw](https://excalidraw.com/#json=zp3vE5xgwoCuDJaBe4o-O,TpqoRKnDdXy5reWfZQZjIg) |
| 2 | Navegación entre vistas (públicas / privadas) | [`NAVEGACION.png`](./documentation/NAVEGACION.png) · [archivo editable en Excalidraw](https://excalidraw.com/#json=zp3vE5xgwoCuDJaBe4o-O,TpqoRKnDdXy5reWfZQZjIg) |
| 3 | Dependencias (frontend / backend) | [`Dependencias.md`](./documentation/Dependencias.md) · [`Dependencias.pdf`](./documentation/Dependencias.pdf) |
| 4 | Tablas de la base de datos y relaciones | [`DB_DIAGRAM.png`](./documentation/DB_DIAGRAM.png) · [`DB_SCHEMA.sql`](./documentation/DB_SCHEMA.sql) · [archivo editable en Excalidraw](https://excalidraw.com/#json=zp3vE5xgwoCuDJaBe4o-O,TpqoRKnDdXy5reWfZQZjIg) |
| 5 | Contrato de datos de la API REST | [`API_CONTRACT.md`](./documentation/API_CONTRACT.md) · [`API_CONTRACT.pdf`](./documentation/API_CONTRACT.pdf) |

### Vistas

| Grupo | Vistas |
|---|---|
| 🟢 Públicas | Home `/` · Galería `/tienda` · Detalle `/producto/:id` · Carrito `/carrito` · Login `/login` · Registro `/registro` · 404 |
| 🔵 Privadas cliente (token) | Mi perfil + mis pedidos `/perfil` |
| 🔴 Privadas admin (token + rol admin) | Panel productos `/admin` · Pedidos `/admin/pedidos` · Crear/editar producto `/admin/producto/nuevo` · `/admin/producto/:id` |

### Guía visual

- **Paleta:** papel washi `#F5F0E8` · tinta sumi `#1C1C1C` · matcha `#2F4A3A` · acentos matcha claro, anko y sakura · rojo hanko `#C8102E`
- **Tipografía:** Shippori Mincho (títulos) · Noto Sans JP (texto)
