var mysql = require('mysql')
require('dotenv').config()

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'root'
const dbName = process.env.DB_NAME || 'citu_parking_app_db'


var db = mysql.createConnection({
    host: host,
    user: user,
    database: dbName
})

module.exports = db
