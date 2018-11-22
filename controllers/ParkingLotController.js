const { ParkingArea, ParkingLots } = require('../bookshelf/models')
const express = require('express')
const Future = require('fluture')
const winston = require('../base/logger')
const parkingRepo = require('../parking-repo')

const router = express.Router()

module.exports = function(io) {

  // Replace Promise Usage with Futures
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

  // Replace Promise Usage with Futures
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
    const status = req.body.status || 0
    const name = req.body.lotName
    parkingRepo
      .updateStatusByName(status,name)
      .map(res => res.toJSON())
      .map(res => ({ parkingLot: { id: res.id, parking_area_id: res.parking_area_id, name: res.name, status: res.status } }))
      .fork(
        (err) => console.log(err),
        (payload) => {
          io.emit('status-changed', payload)
          res.status(200).json({ data: payload })
        })
  })

  return router
}
