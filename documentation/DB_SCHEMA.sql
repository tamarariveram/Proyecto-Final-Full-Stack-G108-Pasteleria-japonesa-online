CREATE DATABASE kashi;

\c kashi

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

INSERT INTO categorias (nombre) VALUES
  ('Mochi'), ('Dorayaki'), ('Daifuku'), ('Té y matcha'), ('Cajas de regalo');

INSERT INTO productos (categoria_id, nombre, descripcion, precio, stock, destacado)
VALUES
  ((SELECT id FROM categorias WHERE nombre = 'Mochi'),
   'Mochi de matcha', 'Masa de arroz glutinoso rellena de crema de matcha.', 2500, 30, true),
  ((SELECT id FROM categorias WHERE nombre = 'Dorayaki'),
   'Dorayaki clásico', 'Dos panqueques esponjosos rellenos de anko (pasta de poroto rojo).', 3000, 20, true),
  ((SELECT id FROM categorias WHERE nombre = 'Daifuku'),
   'Ichigo daifuku', 'Daifuku con frutilla entera y anko blanco.', 3200, 15, false);
