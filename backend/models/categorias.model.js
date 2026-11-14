const { pool } = require('../utils/dbConnection')

const obtenerCategorias = async () => {
  const { rows } = await pool.query('SELECT id, nombre FROM categorias ORDER BY nombre')
  return rows
}

module.exports = { obtenerCategorias }
