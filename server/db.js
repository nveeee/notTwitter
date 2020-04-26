const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.PSQL_USER,
	password: process.env.PSQL_PASS,
	host: 'localhost',
	port: process.env.PSQL_PORT,
	database: 'nottwitter'
});

module.exports = pool;