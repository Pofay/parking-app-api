const app = require('./app')
const db = require('./base/db')
const winston = require('./base/logger')
const http = require('http').Server(app)
const io = require('socket.io')(http)
require('dotenv').config()

const UserController = require('./controllers/UserController')
const ParkingController = require('./controllers/ParkingController')
const ParkingLotController = require('./controllers/ParkingLotController')(io)

app.use('/user', UserController)
app.use('/parking', ParkingController)
app.use('/parking_lot', ParkingLotController)


const PORT = process.env.PORT || 3000

console.log(process.env.DB_HOST)

http.listen(PORT, () => {
    winston.info('Server running in PORT: ' + PORT)
    // Connect to DB
    db.connect((err) => {
        if (err) {
            winston.error('Not Connected to DB: ' + err.stack)
        } else {
            winston.info('Connected to DB')
        }
    })
})
