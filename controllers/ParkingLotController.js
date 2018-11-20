const { ParkingArea, ParkingLots } = require('../bookshelf/models')
const express = require('express')
const winston = require('../base/logger')

const router = express.Router()

module.exports = function(io) {

  router.get('/', (req, res) => {
    ParkingArea.forge().fetchAll({withRelated: ['parking_lots']}).then(result => {
      const transformed = result.toJSON().map(r =>
        ({ 
          areaName: r.name,
          parkingLots: r.parking_lots.map(l => ({ id: l.id, name: l.name, status: l.status }))
        })
      )
      res.status(200).json({ data: transformed })
    })
  })

  router.get('/:id', (req, res) => {
    ParkingLots.where('id',req.params.id).fetch().then(result => {
      const json = result.toJSON()
      const payload = { data: { parkingLot: { 
        id: json.id, name: json.name, status: json.status }
      }}
      res.status(200).json(payload)
    })
  })
  
  router.put('/status', (req, res, next) => {
    ParkingLots
      .where('name', req.body.lotName)
      .fetch()
      .then(res => res.set('status', req.body.status || 0).save())
      .then(result => {
        const json = result.toJSON()
        const payload = { parkingLot: { id: json.id, parking_area_id: json.parking_area_id, name: json.name, status: json.status } }
        io.emit('status-changed', payload)
        res.status(200).json({ data: payload })
      })
  })

  // Transfer this to another file 
  // Module Setup and also include an interchange
  // between Mqtt and Socket.io
  io.on('connection', (socket) => {
    console.log('A User has Connected')

    socket.on('status-change', (parkingLot) => {
      ParkingLots.where('name', parkingLot.name)
        .fetch()
        .then(res => res.set('status', parkingLot.status).save())
        .then(res => {
          const json = res.toJSON()
          const payload = { parkingLot: { id: json.id, parking_area_id: json.parking_area_id, name: json.name, status: json.status } }
          io.emit('status-changed', payload)
        })
    })

    socket.on('disconnect', function() {
      console.log('A User has Disconnected')
    })
  })

  return router
}
