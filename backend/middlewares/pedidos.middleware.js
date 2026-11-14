const estadosPedido = ['pendiente', 'pagado', 'entregado']

const validarItems = (req, res, next) => {
  const { items } = req.body || {}

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío' })
  }

  const itemInvalido = items.find((item) => !item.producto_id || !Number.isInteger(item.cantidad) || item.cantidad <= 0)

  if (itemInvalido) {
    return res.status(400).json({ message: 'Cada producto debe tener producto_id y una cantidad mayor a 0' })
  }

  next()
}

const validarEstado = (req, res, next) => {
  const { estado } = req.body || {}

  if (!estadosPedido.includes(estado)) {
    return res.status(400).json({ message: 'El estado debe ser pendiente, pagado o entregado' })
  }

  next()
}

module.exports = { validarItems, validarEstado }
