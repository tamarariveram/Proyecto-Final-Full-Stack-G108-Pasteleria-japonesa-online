import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProductos } from '../hooks/useProductos'
import { API_URL, MENSAJE_SIN_CONEXION } from '../utils/api'

export const PedidosContext = createContext()

const pedirPedidos = async (token, esAdmin) => {
  const ruta = esAdmin ? '/api/pedidos' : '/api/pedidos/mis-pedidos'
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en ${ruta}`)
  }

  return respuesta.json()
}

const PedidosProvider = ({ children }) => {
  const { token, esAdmin } = useAuth()
  const { recargarProductos } = useProductos()
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    if (!token) return

    const cargarPedidos = async () => {
      try {
        setPedidos(await pedirPedidos(token, esAdmin))
      } catch (error) {
        console.error(error.message)
      }
    }

    cargarPedidos()
  }, [token, esAdmin])

  const crearPedido = async (carrito) => {
    try {
      const items = carrito.map((item) => ({ producto_id: item.id, cantidad: item.cantidad }))
      const respuesta = await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        return { ok: false, mensaje: data.message }
      }

      setPedidos(await pedirPedidos(token, esAdmin))
      await recargarProductos()
      return { ok: true, pedido: data }
    } catch (error) {
      console.error(error.message)
      return { ok: false, mensaje: MENSAJE_SIN_CONEXION }
    }
  }

  const cambiarEstado = async (id, estado) => {
    try {
      const respuesta = await fetch(`${API_URL}/api/pedidos/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        return { ok: false, mensaje: data.message }
      }

      setPedidos(pedidos.map((pedido) => (pedido.id === id ? { ...pedido, estado } : pedido)))
      return { ok: true }
    } catch (error) {
      console.error(error.message)
      return { ok: false, mensaje: MENSAJE_SIN_CONEXION }
    }
  }

  const pedidosDe = (usuarioId) => {
    return pedidos
      .filter((pedido) => pedido.usuario.id === usuarioId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  return (
    <PedidosContext.Provider value={{ pedidos: token ? pedidos : [], crearPedido, cambiarEstado, pedidosDe }}>
      {children}
    </PedidosContext.Provider>
  )
}

export default PedidosProvider
