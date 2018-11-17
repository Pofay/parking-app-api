require('dotenv').config()

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    name: process.env.DB_NAME || 'citu_parking_app_db',
    password: process.env.DB_PASS || ''
  }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
