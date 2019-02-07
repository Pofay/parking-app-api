require('dotenv').config()

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASS || '',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'citu_parking_app_db',
    port: process.env.DB_PORT || 3306
  }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
