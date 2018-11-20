const express = require('express')
const Server = require('socket.io')
const bodyParser = require('body-parser')
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://192.168.0.113:1883')
client.on('connect', () => {
  console.log('Now connected to Mqtt Broker at 192.168.0.113:1883')
})

const app = express()
const io = new Server()

app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override");
  	next();
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const UserController = require('./controllers/UserController')
const ParkingLotController = require('./controllers/ParkingLotController')(io)

app.use('/user', UserController)
app.use('/parking_lots', ParkingLotController)

module.exports = { app, io }
