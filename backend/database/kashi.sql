DROP TABLE IF EXISTS detalle_pedido, pedidos, productos, categorias, usuarios;

CREATE TABLE usuarios (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  rol         VARCHAR(20)  NOT NULL DEFAULT 'cliente'
              CHECK (rol IN ('cliente', 'admin')),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categorias (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre  VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE productos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria_id  UUID NOT NULL REFERENCES categorias(id),
  nombre        VARCHAR(100) NOT NULL,
  descripcion   TEXT,
  precio        INTEGER NOT NULL CHECK (precio > 0),
  imagen_url    TEXT,
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  destacado     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id  UUID NOT NULL REFERENCES usuarios(id),
  total       INTEGER NOT NULL CHECK (total >= 0),
  estado      VARCHAR(20) NOT NULL DEFAULT 'pendiente'
              CHECK (estado IN ('pendiente', 'pagado', 'entregado')),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE detalle_pedido (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id        UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id      UUID NOT NULL REFERENCES productos(id),
  cantidad         INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario  INTEGER NOT NULL CHECK (precio_unitario > 0)
);

INSERT INTO usuarios (nombre, email, password, rol) VALUES
  ('Tamara Rivera', 'tamara@correo.cl', '$2b$10$h10armovpRN9ap77O3cMXeawEmjUaIOdkX079Z.OE25EUy2X.30GC', 'cliente'),
  ('Admin Kashi', 'admin@kashi.cl', '$2b$10$TzjaZic4Qe.Jx188964ebOy2mUe8Gk9282HUiF/gEVXHeXkJ2fo7q', 'admin');

INSERT INTO categorias (nombre) VALUES
  ('Mochi'), ('Dorayaki'), ('Daifuku'), ('Té y matcha'), ('Cajas de regalo');

INSERT INTO productos (categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado) VALUES
  ((SELECT id FROM categorias WHERE nombre = 'Mochi'), 'Mochi de matcha', 'Masa de arroz glutinoso rellena de crema de matcha.', 2500, 'https://placehold.co/600x450/DDE3CF/2F4A3A?text=Mochi+de+matcha', 30, true),
  ((SELECT id FROM categorias WHERE nombre = 'Mochi'), 'Mochi de sésamo negro', 'Mochi suave relleno de pasta de sésamo negro tostado.', 2500, 'https://placehold.co/600x450/DDE3CF/2F4A3A?text=Mochi+de+sesamo', 18, false),
  ((SELECT id FROM categorias WHERE nombre = 'Dorayaki'), 'Dorayaki clásico', 'Dos panqueques esponjosos rellenos de anko (pasta de poroto rojo).', 3000, 'https://placehold.co/600x450/EADBC8/2F4A3A?text=Dorayaki+clasico', 20, true),
  ((SELECT id FROM categorias WHERE nombre = 'Dorayaki'), 'Dorayaki de matcha', 'Dorayaki relleno de anko y crema de matcha.', 3300, 'https://placehold.co/600x450/EADBC8/2F4A3A?text=Dorayaki+de+matcha', 12, false),
  ((SELECT id FROM categorias WHERE nombre = 'Daifuku'), 'Ichigo daifuku', 'Daifuku con frutilla entera y anko blanco.', 3200, 'https://placehold.co/600x450/F3D9DC/2F4A3A?text=Ichigo+daifuku', 15, true),
  ((SELECT id FROM categorias WHERE nombre = 'Daifuku'), 'Daifuku de anko', 'El clásico daifuku de masa de arroz relleno de anko.', 2800, 'https://placehold.co/600x450/F3D9DC/2F4A3A?text=Daifuku+de+anko', 0, false),
  ((SELECT id FROM categorias WHERE nombre = 'Té y matcha'), 'Matcha ceremonial 30 g', 'Té verde en polvo de grado ceremonial, cosechado en Uji.', 8900, 'https://placehold.co/600x450/DDE3CF/2F4A3A?text=Matcha+ceremonial', 10, true),
  ((SELECT id FROM categorias WHERE nombre = 'Té y matcha'), 'Hojicha 50 g', 'Té verde tostado de sabor suave, ideal para la tarde.', 6500, 'https://placehold.co/600x450/EADBC8/2F4A3A?text=Hojicha', 14, false),
  ((SELECT id FROM categorias WHERE nombre = 'Cajas de regalo'), 'Caja de regalo Hanami', 'Seis wagashi de temporada en una caja de madera para regalar.', 12900, 'https://placehold.co/600x450/F3D9DC/2F4A3A?text=Caja+Hanami', 8, false);

INSERT INTO pedidos (usuario_id, total, estado, created_at) VALUES
  ((SELECT id FROM usuarios WHERE email = 'tamara@correo.cl'), 8000, 'entregado', '2026-10-22 18:30:00'),
  ((SELECT id FROM usuarios WHERE email = 'tamara@correo.cl'), 12900, 'pendiente', '2026-10-30 23:05:00');

INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES
  ((SELECT id FROM pedidos WHERE total = 8000), (SELECT id FROM productos WHERE nombre = 'Mochi de matcha'), 2, 2500),
  ((SELECT id FROM pedidos WHERE total = 8000), (SELECT id FROM productos WHERE nombre = 'Dorayaki clásico'), 1, 3000),
  ((SELECT id FROM pedidos WHERE total = 12900), (SELECT id FROM productos WHERE nombre = 'Caja de regalo Hanami'), 1, 12900);
