const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../models/productos.model')

const datosProducto = (body) => ({
  categoria_id: body.categoria_id,
  nombre: body.nombre.trim(),
  descripcion: body.descripcion || '',
  precio: body.precio,
  imagen_url: body.imagen_url || '',
  stock: body.stock,
  destacado: body.destacado === true,
})

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

const crear = async (req, res) => {
  try {
    const producto = await crearProducto(datosProducto(req.body))
    res.status(201).json(producto)
  } catch (error) {
    if (error.code === '23503' || error.code === '22P02') {
      return res.status(400).json({ message: 'La categoría no existe' })
    }
    res.status(500).json({ message: 'Error al crear el producto' })
  }
}

const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await actualizarProducto(id, datosProducto(req.body))

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(producto)
  } catch (error) {
    if (error.code === '23503' || error.code === '22P02') {
      return res.status(400).json({ message: 'El producto o la categoría no son válidos' })
    }
    res.status(500).json({ message: 'Error al actualizar el producto' })
  }
}

const eliminar = async (req, res) => {
  try {
    const { id } = req.params
    const eliminados = await eliminarProducto(id)

    if (eliminados === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({ message: 'El producto tiene pedidos asociados. Puedes dejar su stock en 0' })
    }
    if (error.code === '22P02') {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.status(500).json({ message: 'Error al eliminar el producto' })
  }
}

module.exports = { listarProductos, verProducto, crear, actualizar, eliminar }
