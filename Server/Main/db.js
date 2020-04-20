const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cs2102',
  password: 'password',
  post: 5432
})

const transact = async (callback) => {
    const client = await pool.connect()

    try {
        await client.query(`BEGIN`)
        const result = await callback(client.query.bind(client))
        await client.query(`COMMIT`)
        return result
    } catch (err) {
        await client.query(`ROLLBACK`)
        throw err
    } finally {
        client.release()
    }
}

module.exports = {
    query: pool.query.bind(pool), transact
}