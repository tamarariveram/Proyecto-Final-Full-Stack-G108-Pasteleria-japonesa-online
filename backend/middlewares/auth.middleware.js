const jwt = require('jsonwebtoken')

const validarCredenciales = (req, res, next) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Debes enviar email y contraseña' })
  }

  next()
}

const validarToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Debes enviar un token' })
  }

  const token = authorization.split('Bearer ')[1]

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o vencido' })
  }
}

const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ message: 'Necesitas permisos de administrador' })
  }

  next()
}

module.exports = { validarCredenciales, validarToken, esAdmin }
