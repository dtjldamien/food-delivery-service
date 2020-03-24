const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cs2102project',
  password: 'Aaron123',
  post: 5432
})

module.exports = pool