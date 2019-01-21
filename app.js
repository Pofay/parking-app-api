const express = require('express')
const Server = require('socket.io')
const bodyParser = require('body-parser')
const mqtt = require('mqtt')
const ioToMqttHub = require('./io-to-mqtt-hub')
const ioConfiguration = require('./io-configuration')

const mqttClient = mqtt.connect('mqtt://192.168.0.110:1883')

const io = new Server()
const app = express()

ioConfiguration.configure(io)
ioToMqttHub.setup(io, mqttClient)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override'
  )
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const ParkingLotController = require('./controllers/ParkingLotController')(io)
const OccupationController = require('./controllers/OccupationController')()

app.use('/parking_lots', ParkingLotController)
app.use('/lot_occupations', OccupationController)

module.exports = { app, io }
