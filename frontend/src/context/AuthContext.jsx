import { createContext, useEffect, useState } from 'react'
import { API_URL, MENSAJE_SIN_CONEXION } from '../utils/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('kashi-token'))
  const [usuario, setUsuario] = useState(token ? JSON.parse(localStorage.getItem('kashi-usuario')) : null)

  useEffect(() => {
    if (token && usuario) {
      localStorage.setItem('kashi-token', token)
      localStorage.setItem('kashi-usuario', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('kashi-token')
      localStorage.removeItem('kashi-usuario')
    }
  }, [token, usuario])

  useEffect(() => {
    if (!token) return

    const revisarSesion = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (respuesta.status === 401) {
          setToken(null)
          setUsuario(null)
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    revisarSesion()
  }, [token])

  const login = async (email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        return { ok: false, mensaje: data.message }
      }

      setToken(data.token)
      setUsuario(data.usuario)
      return { ok: true, usuario: data.usuario }
    } catch (error) {
      console.error(error.message)
      return { ok: false, mensaje: MENSAJE_SIN_CONEXION }
    }
  }

  const registrar = async (nombre, email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        return { ok: false, mensaje: data.message }
      }

      return login(email, password)
    } catch (error) {
      console.error(error.message)
      return { ok: false, mensaje: MENSAJE_SIN_CONEXION }
    }
  }

  const logout = () => {
    setToken(null)
    setUsuario(null)
  }

  const esAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuario, token, esAdmin, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
