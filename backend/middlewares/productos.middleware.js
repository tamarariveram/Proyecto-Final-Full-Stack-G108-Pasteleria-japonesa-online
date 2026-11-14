const validarProducto = (req, res, next) => {
  const { categoria_id, nombre, precio, stock } = req.body || {}

  if (!categoria_id || !nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ message: 'Debes enviar categoria_id, nombre, precio y stock' })
  }

  if (!Number.isInteger(precio) || precio <= 0) {
    return res.status(400).json({ message: 'El precio debe ser un número entero mayor a 0' })
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ message: 'El stock debe ser un número entero igual o mayor a 0' })
  }

  next()
}

module.exports = { validarProducto }
