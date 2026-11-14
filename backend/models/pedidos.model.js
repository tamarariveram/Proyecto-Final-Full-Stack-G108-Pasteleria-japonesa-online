const { pool } = require('../utils/dbConnection')

const obtenerPedidos = async (usuarioId) => {
  const valores = []
  let filtro = ''

  if (usuarioId) {
    valores.push(usuarioId)
    filtro = 'WHERE pe.usuario_id = $1'
  }

  const consulta = `
    SELECT pe.id, pe.total, pe.estado, pe.created_at,
           json_build_object('id', u.id, 'nombre', u.nombre, 'email', u.email) AS usuario,
           json_agg(
             json_build_object(
               'producto_id', d.producto_id,
               'nombre', pr.nombre,
               'cantidad', d.cantidad,
               'precio_unitario', d.precio_unitario,
               'subtotal', d.cantidad * d.precio_unitario
             ) ORDER BY pr.nombre
           ) AS items
    FROM pedidos pe
    JOIN usuarios u ON u.id = pe.usuario_id
    JOIN detalle_pedido d ON d.pedido_id = pe.id
    JOIN productos pr ON pr.id = d.producto_id
    ${filtro}
    GROUP BY pe.id, u.id
    ORDER BY pe.created_at DESC
  `
  const { rows } = await pool.query(consulta, valores)
  return rows
}

const crearPedido = async (usuarioId, items) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const detalle = []
    let total = 0

    for (const { producto_id, cantidad } of items) {
      const { rows } = await client.query(
        'SELECT id, nombre, precio, stock FROM productos WHERE id = $1',
        [producto_id],
      )
      const producto = rows[0]

      if (!producto) {
        throw { code: 404, message: 'Uno de los productos no existe' }
      }

      if (producto.stock < cantidad) {
        throw { code: 400, message: `No hay stock suficiente de ${producto.nombre}` }
      }

      await client.query('UPDATE productos SET stock = stock - $1 WHERE id = $2', [cantidad, producto_id])

      total += producto.precio * cantidad
      detalle.push({
        producto_id,
        nombre: producto.nombre,
        cantidad,
        precio_unitario: producto.precio,
        subtotal: producto.precio * cantidad,
      })
    }

    const { rows } = await client.query(
      'INSERT INTO pedidos (usuario_id, total) VALUES ($1, $2) RETURNING id, total, estado, created_at',
      [usuarioId, total],
    )
    const pedido = rows[0]

    for (const item of detalle) {
      await client.query(
        'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
        [pedido.id, item.producto_id, item.cantidad, item.precio_unitario],
      )
    }

    await client.query('COMMIT')
    return { ...pedido, items: detalle }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

const actualizarEstado = async (id, estado) => {
  const { rows } = await pool.query(
    'UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING id, estado',
    [estado, id],
  )
  return rows[0]
}

module.exports = { obtenerPedidos, crearPedido, actualizarEstado }
