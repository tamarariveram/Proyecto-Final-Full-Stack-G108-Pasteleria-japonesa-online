import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { API_URL, MENSAJE_SIN_CONEXION } from '../utils/api'

export const ProductContext = createContext()

const pedirDatos = async (ruta) => {
  const respuesta = await fetch(`${API_URL}${ruta}`)

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en ${ruta}`)
  }

  return respuesta.json()
}

const ProductProvider = ({ children }) => {
  const { token } = useAuth()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCategorias(await pedirDatos('/api/categorias'))
        setProductos(await pedirDatos('/api/productos'))
      } catch (error) {
        console.error(error.message)
        setError(MENSAJE_SIN_CONEXION)
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  const recargarProductos = async () => {
    setProductos(await pedirDatos('/api/productos'))
  }

  const obtenerProducto = (id) => productos.find((producto) => producto.id === id)

  const enviarProducto = async (ruta, method, datos) => {
    try {
      const respuesta = await fetch(`${API_URL}${ruta}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: datos ? JSON.stringify(datos) : undefined,
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        return { ok: false, mensaje: data.message }
      }

      await recargarProductos()
      return { ok: true }
    } catch (error) {
      console.error(error.message)
      return { ok: false, mensaje: MENSAJE_SIN_CONEXION }
    }
  }

  const crearProducto = (datos) => enviarProducto('/api/productos', 'POST', datos)

  const actualizarProducto = (id, datos) => enviarProducto(`/api/productos/${id}`, 'PUT', datos)

  const eliminarProducto = (id) => enviarProducto(`/api/productos/${id}`, 'DELETE')

  return (
    <ProductContext.Provider
      value={{ productos, categorias, cargando, error, obtenerProducto, recargarProductos, crearProducto, actualizarProducto, eliminarProducto }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
