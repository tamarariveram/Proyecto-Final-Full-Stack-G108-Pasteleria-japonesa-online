import { useEffect, useState } from 'react'
import { PedidosContext } from './PedidosContext'
import { pedidos as pedidosIniciales } from '../data/pedidos'

const leerPedidosGuardados = () => {
  const guardados = localStorage.getItem('kashi-pedidos')
  return guardados ? JSON.parse(guardados) : pedidosIniciales
}

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(leerPedidosGuardados)

  useEffect(() => {
    localStorage.setItem('kashi-pedidos', JSON.stringify(pedidos))
  }, [pedidos])

  const crearPedido = (usuario, carrito, total) => {
    const nuevoPedido = {
      id: crypto.randomUUID(),
      total,
      estado: 'pendiente',
      created_at: new Date().toISOString(),
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      items: carrito.map((item) => ({
        producto_id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
    }

    setPedidos([nuevoPedido, ...pedidos])
    return nuevoPedido
  }

  const cambiarEstado = (id, estado) => {
    setPedidos(pedidos.map((pedido) => (pedido.id === id ? { ...pedido, estado } : pedido)))
  }

  const pedidosDe = (usuarioId) => {
    return pedidos
      .filter((pedido) => pedido.usuario.id === usuarioId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  return (
    <PedidosContext.Provider value={{ pedidos, crearPedido, cambiarEstado, pedidosDe }}>
      {children}
    </PedidosContext.Provider>
  )
}
