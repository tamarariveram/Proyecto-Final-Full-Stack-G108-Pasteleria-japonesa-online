export const pedidos = [
  {
    id: '8e5b0133-cc02-48ae-86cc-6314af507078',
    total: 8000,
    estado: 'entregado',
    created_at: '2026-10-22T18:30:00.000Z',
    usuario: {
      id: 'c20ab218-6724-4aa7-8c6e-24fcb22dee49',
      nombre: 'Tamara Rivera',
      email: 'tamara@correo.cl',
    },
    items: [
      { producto_id: '6333c8b0-ec28-4247-809d-abbef6926970', nombre: 'Mochi de matcha', cantidad: 2, precio_unitario: 2500, subtotal: 5000 },
      { producto_id: 'cffa021c-8874-49eb-892e-242973f5023d', nombre: 'Dorayaki clásico', cantidad: 1, precio_unitario: 3000, subtotal: 3000 },
    ],
  },
  {
    id: 'e43bd8d7-5d5c-4c63-a039-a4620e88bc4b',
    total: 12900,
    estado: 'pendiente',
    created_at: '2026-10-30T23:05:00.000Z',
    usuario: {
      id: 'c20ab218-6724-4aa7-8c6e-24fcb22dee49',
      nombre: 'Tamara Rivera',
      email: 'tamara@correo.cl',
    },
    items: [
      { producto_id: '4f502499-6439-492e-84b1-850267625d49', nombre: 'Caja de regalo Hanami', cantidad: 1, precio_unitario: 12900, subtotal: 12900 },
    ],
  },
]
