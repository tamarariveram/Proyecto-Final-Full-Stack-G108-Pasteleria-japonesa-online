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

const crearProducto = async ({ categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado }) => {
  const consulta = `
    INSERT INTO productos (categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `
  const valores = [categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado]
  const { rows } = await pool.query(consulta, valores)
  return obtenerProductoPorId(rows[0].id)
}

const actualizarProducto = async (id, { categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado }) => {
  const consulta = `
    UPDATE productos
    SET categoria_id = $1, nombre = $2, descripcion = $3, precio = $4,
        imagen_url = $5, stock = $6, destacado = $7
    WHERE id = $8
  `
  const valores = [categoria_id, nombre, descripcion, precio, imagen_url, stock, destacado, id]
  const { rowCount } = await pool.query(consulta, valores)
  if (rowCount === 0) return undefined
  return obtenerProductoPorId(id)
}

const eliminarProducto = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1', [id])
  return rowCount
}

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto }
