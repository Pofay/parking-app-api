const bodyParser = require('body-parser')
const { ParkingArea, ParkingLot } = require('../bookshelf/models')
const express = require('express')
const Promise = require('bluebird')
const moment = require('moment')

// const db = require('../base/db')
const winston = require('../base/logger')

const router = express.Router()

// const ParkingArea = require('../models/ParkingArea')
// const ParkingLot = require('../models/ParkingLot')

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


    router.get('/id/:id', (req, res) => {    
        new Promise((resolve, reject) => {
            db.query(ParkingLot.getParkingLotByID(req.params.id), (err, data, _) => {
                if (err == null)
                    resolve(data)
                else 
                    reject(err)
            })
        }).then((resolve) => {
            winston.log('info', resolve)
            res.status(200).json({ data: resolve })
        }).catch((reject) => {
            winston.error(reject)
            res.status(400).json({ code: reject.code, message: reject.sqlMessage })
        }) 
    })

    router.put('/status', (req, res, next) => {
        const params = req.body
        if (params.id === undefined) {
            res.status(400).json({ code: '', message: 'id is required' })
        }
        const status = params.status || 0
        new Promise((resolve, reject) => {
            db.query(ParkingLot.updateParkingLotStatus(params.id, status), (err, data, _) => {
                if (err == null)
                    resolve(data)
                else 
                    reject(err)
            })
        }).then((success) => {
            winston.info(success)
            return new Promise((resolve, reject) => {
            db.query(ParkingLot.getParkingLotByID(params.id), (err, data, _) => {
                if (err == null)
                    resolve({ data: data, updated: success.affectedRows > 0})
                else 
                    reject(err)
                })
            })
        }).then(success => {
            io.emit('status-changed', success.data[0])
            res.status(200).json({ updated: success.updated })
        })
        .catch((reject) => {
            winston.error(reject)
            res.status(400).json({ code: reject.code, message: reject.sqlMessage })
        }) 
    })

    io.on('connection', function(socket) {
        console.log('A User has Connected')
        socket.on('status-change', function(parkingLot) {
        new Promise((resolve, reject) => {
            db.query(ParkingLot.updateParkingLotStatus(parseInt(parkingLot.id), parkingLot.status), (err, data, _) => {
                if (err == null)
                    resolve(data)
                else 
                    reject(err)
            })
        }).then(success => {
            return new Promise((resolve, reject) => {
            db.query(ParkingLot.getParkingLotByID(parseInt(parkingLot.id)), (err, data, _) => {
                if (err == null)
                    resolve(data[0])
                else 
                    reject(err)
                })
            })
        }).then(parkingLot => {
            io.emit('status-changed', parkingLot)
            console.log(parkingLot)
        })
        .catch(err => {
            winston.error(err)
            io.emit('status-changed-error', err);
            })
        })
        socket.on('disconnect', function() {
            console.log('A User has Disconnected')
         })
    })
    return router
}
