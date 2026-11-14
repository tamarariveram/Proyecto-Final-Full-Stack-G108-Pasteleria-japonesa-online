const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  allowExitOnIdle: true,
})

const checkConnection = async () => {
  const result = await pool.query('SELECT NOW()')
  return result.rows[0].now
}

module.exports = { pool, checkConnection }
