
//Connecting MSSQL Server
require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// use connection
let pool = null;

async function getPool() {
    if(pool){
        return pool;
    }
    pool = await sql.connect(dbConfig);
    console.log('Connect with MSSQL');
    return pool;

}

module.exports = {sql, getPool}