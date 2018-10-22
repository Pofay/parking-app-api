const bodyParser = require('body-parser')
const express = require('express')
const moment = require('moment')

const db = require('../base/db')
const winston = require('../base/logger')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const Parking = require('../models/Parking')

router.get('/', (req, res) => {
    new Promise((resolve, reject) => {
        db.query(Parking.getParkings(), (err, data, _) => {
            if (err == null)
                resolve(data)
            else 
                reject(err)
        })
    }).then((resolve) => {
        winston.info(resolve)
        res.status(200).json({ data: resolve })
    }).catch((reject) => {
        winston.error(reject)
        res.status(400).json({ code: reject.code, message: reject.sqlMessage })
    }) 
})

router.get('/id/:id', (req, res) => {    
    new Promise((resolve, reject) => {
        db.query(Parking.getParkingByID(req.params.id), (err, data, _) => {
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

router.put('/id/:id', (req, res) => {
    new Promise((resolve, reject) => {
        db.query(Parking.updateParkingUpdatedDate(req.params.id, moment().toISOString()), (err, data, _) => {
            if (err == null)
                resolve(data)
            else 
                reject(err)
        })
    }).then((resolve) => {
        winston.log('info', resolve)
        res.status(200).json({ updated: resolve.affectedRows > 0 })
    }).catch((reject) => {
        winston.error(reject)
        res.status(400).json({ code: reject.code, message: reject.sqlMessage })
    }) 
})
module.exports = router