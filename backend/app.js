require('dotenv').config({ quiet: true })
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const categoriasRoutes = require('./routes/categorias.routes')
const productosRoutes = require('./routes/productos.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API de Kashi funcionando' })
})

app.use('/api/auth', authRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/productos', productosRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'La ruta no existe' })
})

module.exports = app
