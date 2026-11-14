const { obtenerProductos, obtenerProductoPorId } = require('../models/productos.model')

const listarProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos(req.query)
    res.json(productos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' })
  }
}

const verProducto = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await obtenerProductoPorId(id)

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(producto)
  } catch (error) {
    if (error.code === '22P02') {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.status(500).json({ message: 'Error al obtener el producto' })
  }
}

module.exports = { listarProductos, verProducto }
