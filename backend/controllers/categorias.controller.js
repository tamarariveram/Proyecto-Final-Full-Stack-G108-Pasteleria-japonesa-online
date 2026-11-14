const { obtenerCategorias } = require('../models/categorias.model')

const listarCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategorias()
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías' })
  }
}

module.exports = { listarCategorias }
