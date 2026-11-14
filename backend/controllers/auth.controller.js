const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { buscarUsuarioPorEmail, buscarUsuarioPorId, crearUsuario } = require('../models/usuarios.model')

const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body || {}

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Debes enviar nombre, email y contraseña' })
    }

    if (!email.includes('@') || password.length < 6) {
      return res.status(400).json({ message: 'Email inválido o contraseña de menos de 6 caracteres' })
    }

    const correo = email.trim().toLowerCase()
    const existe = await buscarUsuarioPorEmail(correo)

    if (existe) {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese email' })
    }

    const passwordEncriptada = await bcrypt.hash(password, 10)
    const usuario = await crearUsuario({ nombre: nombre.trim(), email: correo, password: passwordEncriptada })

    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const usuario = await buscarUsuarioPorEmail(email.trim().toLowerCase())

    if (!usuario) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' })
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password)

    if (!passwordCorrecta) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' })
    }

    const { id, nombre, rol } = usuario
    const token = jwt.sign({ id, email: usuario.email, rol }, process.env.JWT_SECRET, { expiresIn: '8h' })

    res.json({ token, usuario: { id, nombre, email: usuario.email, rol } })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}

const perfil = async (req, res) => {
  try {
    const usuario = await buscarUsuarioPorId(req.usuario.id)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' })
  }
}

module.exports = { registrar, login, perfil }
