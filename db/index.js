require('dotenv').config();
const { Pool } = require('pg')

// PostgreSQL credentials
const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    // ssl: true
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}