const express = require('express')
const Server = require('socket.io')
const bodyParser = require('body-parser')
const mqtt = require('mqtt')
const ioToMqttHub = require('./io-to-mqtt-hub')

const mqttClient = mqtt.connect('mqtt://192.168.0.113:1883')

mqttClient.on('connect', () => {
  console.log('Now connected to Mqtt Broker at 192.168.0.113:1883')
})

const io = new Server()
const app = express()

ioToMqttHub.setup(io, mqttClient)

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
