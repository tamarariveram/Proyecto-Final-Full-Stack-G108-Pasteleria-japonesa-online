import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'

const leerCarritoGuardado = () => {
  const guardado = localStorage.getItem('kashi-carrito')
  return guardado ? JSON.parse(guardado) : []
}

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(leerCarritoGuardado)

  useEffect(() => {
    localStorage.setItem('kashi-carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const enCarrito = carrito.find((item) => item.id === producto.id)?.cantidad ?? 0

    if (enCarrito + cantidad > producto.stock) {
      return false
    }

    if (enCarrito > 0) {
      setCarrito(carrito.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item)))
    } else {
      setCarrito([...carrito, { ...producto, cantidad }])
    }

    return true
  }

  const cambiarCantidad = (id, cantidad) => {
    setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: Math.min(Math.max(cantidad, 1), item.stock) } : item)))
  }

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => setCarrito([])

  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito, cantidadTotal, total }}>
      {children}
    </CartContext.Provider>
  )
}
