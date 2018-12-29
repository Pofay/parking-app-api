const { app, io } = require('./app')
//const db = require('./base/db')
const winston = require('./base/logger')

const http = require('http').Server(app)
io.attach(http)
require('dotenv').config()

const PORT = process.env.PORT || 4000
console.log(process.env.DB_HOST)

http.listen(PORT, () => {
    winston.info('Server running in PORT: ' + PORT)
    // Connect to DB
  /*
    db.connect((err) => {
        if (err) {
            winston.error('Not Connected to DB: ' + err.stack)
        } else {
            winston.info('Connected to DB')
        }
    })
    */
})

