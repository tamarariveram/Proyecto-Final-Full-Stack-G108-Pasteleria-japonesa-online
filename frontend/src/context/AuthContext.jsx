import { createContext, useEffect, useState } from 'react'
import { usuarios } from '../data/usuarios'

export const AuthContext = createContext()

const datosPublicos = ({ id, nombre, email, rol }) => ({ id, nombre, email, rol })

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('kashi-usuario')))
  const [cuentas, setCuentas] = useState(usuarios)

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('kashi-usuario', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('kashi-usuario')
    }
  }, [usuario])

  const login = (email, password) => {
    const cuenta = cuentas.find((item) => item.email === email.trim().toLowerCase() && item.password === password)

    if (!cuenta) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos' }
    }

    const sesion = datosPublicos(cuenta)
    setUsuario(sesion)
    return { ok: true, usuario: sesion }
  }

  const registrar = (nombre, email, password) => {
    const correo = email.trim().toLowerCase()

    if (cuentas.find((item) => item.email === correo)) {
      return { ok: false, mensaje: 'Ya existe una cuenta con ese correo' }
    }

    const nuevaCuenta = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      email: correo,
      password,
      rol: 'cliente',
      created_at: new Date().toISOString(),
    }

    setCuentas([...cuentas, nuevaCuenta])
    const sesion = datosPublicos(nuevaCuenta)
    setUsuario(sesion)
    return { ok: true, usuario: sesion }
  }

  const logout = () => setUsuario(null)

  const esAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
