const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    hos: 'localhost',
    user: 'root',
    password: '051221',
    database: 'blog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;