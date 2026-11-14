const { pool } = require('../utils/dbConnection')

const consultaBase = `
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen_url, p.stock, p.destacado,
         json_build_object('id', c.id, 'nombre', c.nombre) AS categoria
  FROM productos p
  JOIN categorias c ON c.id = p.categoria_id
`

const obtenerProductos = async ({ categoria, destacado }) => {
  const condiciones = []
  const valores = []

  const agregarFiltro = (campo, valor) => {
    valores.push(valor)
    condiciones.push(`${campo} = $${valores.length}`)
  }

  if (categoria) agregarFiltro('c.nombre', categoria)
  if (destacado) agregarFiltro('p.destacado', destacado === 'true')

  let consulta = consultaBase
  if (condiciones.length > 0) {
    consulta += ` WHERE ${condiciones.join(' AND ')}`
  }
  consulta += ' ORDER BY p.created_at DESC, p.nombre'

  const { rows } = await pool.query(consulta, valores)
  return rows
}

const obtenerProductoPorId = async (id) => {
  const { rows } = await pool.query(`${consultaBase} WHERE p.id = $1`, [id])
  return rows[0]
}

module.exports = { obtenerProductos, obtenerProductoPorId }
