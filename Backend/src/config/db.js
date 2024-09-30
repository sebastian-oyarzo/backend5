require('dotenv').config();
const { key } = process.env;
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: key,
    database: 'softjobs',
    allowExitOnIdle: true
});

module.exports = pool;