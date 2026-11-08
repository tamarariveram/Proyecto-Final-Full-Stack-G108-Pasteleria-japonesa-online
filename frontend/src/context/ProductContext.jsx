import { createContext, useEffect, useState } from 'react'
import { productos as productosIniciales } from '../data/productos'
import { categorias } from '../data/categorias'

export const ProductContext = createContext()

const armarProducto = (datos) => {
  const { categoria_id, ...resto } = datos
  const categoria = categorias.find((item) => item.id === categoria_id)
  return { ...resto, categoria }
}

const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('kashi-productos')) || productosIniciales)

  useEffect(() => {
    localStorage.setItem('kashi-productos', JSON.stringify(productos))
  }, [productos])

  const obtenerProducto = (id) => productos.find((producto) => producto.id === id)

  const crearProducto = (datos) => {
    const nuevoProducto = { id: crypto.randomUUID(), ...armarProducto(datos) }
    setProductos([nuevoProducto, ...productos])
    return nuevoProducto
  }

  const actualizarProducto = (id, datos) => {
    setProductos(productos.map((producto) => (producto.id === id ? { id, ...armarProducto(datos) } : producto)))
  }

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id))
  }

  return (
    <ProductContext.Provider value={{ productos, categorias, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
