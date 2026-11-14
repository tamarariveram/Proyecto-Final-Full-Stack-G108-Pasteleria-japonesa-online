const { obtenerPedidos, crearPedido, actualizarEstado } = require('../models/pedidos.model')

const crear = async (req, res) => {
  try {
    const pedido = await crearPedido(req.usuario.id, req.body.items)
    res.status(201).json(pedido)
  } catch (error) {
    if (typeof error.code === 'number') {
      return res.status(error.code).json({ message: error.message })
    }
    if (error.code === '22P02') {
      return res.status(404).json({ message: 'Uno de los productos no existe' })
    }
    res.status(500).json({ message: 'Error al crear el pedido' })
  }
}

const misPedidos = async (req, res) => {
  try {
    const pedidos = await obtenerPedidos(req.usuario.id)
    res.json(pedidos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tus pedidos' })
  }
}

const todos = async (req, res) => {
  try {
    const pedidos = await obtenerPedidos()
    res.json(pedidos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' })
  }
}

const cambiarEstado = async (req, res) => {
  try {
    const pedido = await actualizarEstado(req.params.id, req.body.estado)

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }

    res.json(pedido)
  } catch (error) {
    if (error.code === '22P02') {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }
    res.status(500).json({ message: 'Error al cambiar el estado' })
  }
}

module.exports = { crear, misPedidos, todos, cambiarEstado }
