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

  return router
}
