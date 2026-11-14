const request = require('supertest')
const app = require('../app')
const { pool } = require('../utils/dbConnection')

let tokenCliente
let tokenAdmin

beforeAll(async () => {
  const cliente = await request(app)
    .post('/api/auth/login')
    .send({ email: 'tamara@correo.cl', password: 'MiClave123' })
  tokenCliente = cliente.body.token

  const admin = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@kashi.cl', password: 'Admin123' })
  tokenAdmin = admin.body.token
})

afterAll(async () => {
  await pool.end()
})

describe('Productos', () => {
  it('GET /api/productos devuelve 200 y un arreglo con productos', async () => {
    const response = await request(app).get('/api/productos')

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    expect(response.body[0]).toHaveProperty('categoria')
  })

  it('GET /api/productos/:id devuelve 404 si el producto no existe', async () => {
    const response = await request(app).get('/api/productos/00000000-0000-0000-0000-000000000000')

    expect(response.statusCode).toBe(404)
  })

  it('POST /api/productos devuelve 403 si quien lo intenta no es admin', async () => {
    const response = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({ categoria_id: 'x', nombre: 'Prueba', precio: 1000, stock: 1 })

    expect(response.statusCode).toBe(403)
  })

  it('DELETE /api/productos/:id devuelve 409 si el producto tiene pedidos', async () => {
    const productos = await request(app).get('/api/productos?categoria=Mochi')
    const mochi = productos.body.find((producto) => producto.nombre === 'Mochi de matcha')

    const response = await request(app)
      .delete(`/api/productos/${mochi.id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)

    expect(response.statusCode).toBe(409)
  })
})

describe('Autenticación', () => {
  it('POST /api/auth/login devuelve 200 y un token con credenciales correctas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tamara@correo.cl', password: 'MiClave123' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.usuario).not.toHaveProperty('password')
  })

  it('POST /api/auth/login devuelve 401 con una contraseña incorrecta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'tamara@correo.cl', password: 'incorrecta' })

    expect(response.statusCode).toBe(401)
  })

  it('GET /api/auth/me devuelve 401 si no se envía token', async () => {
    const response = await request(app).get('/api/auth/me')

    expect(response.statusCode).toBe(401)
  })
})

describe('Pedidos', () => {
  it('POST /api/pedidos devuelve 400 si el carrito está vacío', async () => {
    const response = await request(app)
      .post('/api/pedidos')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({ items: [] })

    expect(response.statusCode).toBe(400)
  })

  it('GET /api/pedidos/mis-pedidos devuelve 200 y los pedidos de la clienta', async () => {
    const response = await request(app)
      .get('/api/pedidos/mis-pedidos')
      .set('Authorization', `Bearer ${tokenCliente}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
})
