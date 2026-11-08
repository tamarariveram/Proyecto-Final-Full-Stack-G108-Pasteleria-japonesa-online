# Kashi - Pastelería japonesa online

Proyecto Final · Desarrollo Full Stack JavaScript · Desafío Latam G108
Autora: Tamara Rivera

🌐 **Demo:** [kashi-steel.vercel.app](https://kashi-steel.vercel.app/)

**Cuentas de prueba**

| Rol | Correo | Contraseña |
|---|---|---|
| Cliente | tamara@correo.cl | MiClave123 |
| Admin | admin@kashi.cl | Admin123 |

## El proyecto

**Kashi** es una tienda online de wagashi (dulces tradicionales japoneses: mochi, dorayaki, daifuku, té y matcha). Funciona como marketplace de vendedor único:

- **Clientes:** navegan el catálogo, filtran por categoría, agregan productos al carrito, compran y revisan su historial de pedidos.
- **Administradora:** crea, edita y elimina productos, y revisa todos los pedidos de la tienda.

**Problema que resuelve:** una pastelería pequeña que hoy vende solo por mensajes de Instagram necesita un catálogo siempre actualizado y una forma ordenada de recibir y registrar pedidos.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite, React Router, Context API, React Bootstrap, SweetAlert2 |
| Backend | Node.js, Express, JWT, bcryptjs |
| Base de datos | PostgreSQL |
| Testing | Jest + Supertest |
| Despliegue | Vercel (frontend) · Render (backend) · Supabase o Neon (base de datos) |

## Instalación (frontend)

Requisitos: Node.js 20.19 o superior y npm.

```bash
git clone https://github.com/tamarariveram/Proyecto-Final-Full-Stack-G108-Pasteleria-japonesa-online.git
cd Proyecto-Final-Full-Stack-G108-Pasteleria-japonesa-online/frontend
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Muestra la versión de producción en local |
| `npm run lint` | Revisa el código con ESLint |

## Hito 2 · Frontend

Por ahora la app usa **datos simulados** (carpeta `src/data`) con los mismos campos del [contrato de la API](./documentation/API_CONTRACT.md). El carrito, la sesión, los productos y los pedidos se guardan en el `localStorage` del navegador. En el Hito 3 los contextos pasarán a usar `fetch` contra el backend.

### Estructura

```
frontend/src
├── components   Header, Footer, ProductCard, CartItem, CategoryFilter, rutas protegidas...
├── context      AuthContext, ProductContext, PedidosContext, CartContext
├── data         Datos simulados (productos, categorías, usuarios, pedidos)
├── hooks        useAuth, useProductos, usePedidos, useCart
├── pages        Una vista por ruta
└── utils        Formato de precios y fechas, alertas
```

### Qué se puede hacer

- **Sin sesión:** ver productos, filtrar por categoría, ver el detalle y armar el carrito. Al pagar se redirige al login.
- **Cliente:** registrarse, iniciar sesión, comprar y ver sus pedidos en `/perfil`.
- **Admin:** crear, editar y eliminar productos (no deja eliminar productos con pedidos) y cambiar el estado de los pedidos.

### Requerimientos del hito

| Requerimiento | Dónde |
|---|---|
| Proyecto con Vite e instalación de dependencias | `frontend/package.json` |
| React Router con `Link` y redirección con `useNavigate` | `App.jsx`, `Header.jsx`, `Detalle.jsx`, `Carrito.jsx`, `Login.jsx` |
| Componentes reutilizables con props y `.map()` | `ProductCard`, `CartItem`, `CategoryFilter`, `EstadoPedido` |
| Hooks además de `useState` | `useEffect`, `useContext`, `useRef`, `useParams`, `useNavigate` y custom hooks |
| Context API para el estado global | 4 contextos en `src/context` |

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
