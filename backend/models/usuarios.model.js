const { pool } = require('../utils/dbConnection')

const buscarUsuarioPorEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
  return rows[0]
}

const buscarUsuarioPorId = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, nombre, email, rol, created_at FROM usuarios WHERE id = $1',
    [id],
  )
  return rows[0]
}

const crearUsuario = async ({ nombre, email, password }) => {
  const consulta = `
    INSERT INTO usuarios (nombre, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, nombre, email, rol
  `
  const { rows } = await pool.query(consulta, [nombre, email, password])
  return rows[0]
}

module.exports = { buscarUsuarioPorEmail, buscarUsuarioPorId, crearUsuario }
