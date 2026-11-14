const app = require('./app')
const { checkConnection } = require('./utils/dbConnection')

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`🟢 Servidor de Kashi en http://localhost:${PORT}`)
  try {
    const hora = await checkConnection()
    console.log(`💾 Base de datos conectada: ${hora}`)
  } catch (error) {
    console.log(`🔴 Error al conectar la base de datos: ${error.message}`)
  }
})
