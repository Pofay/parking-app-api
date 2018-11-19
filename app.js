const express = require('express')
const Server = require('socket.io')
const app = express()
const io = new Server()

app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override");
  	next();
})
const UserController = require('./controllers/UserController')
const ParkingController = require('./controllers/ParkingController')
const ParkingLotController = require('./controllers/ParkingLotController')(io)

app.use('/user', UserController)
app.use('/parking', ParkingController)
app.use('/parking_lot', ParkingLotController)


module.exports = { app, io }
