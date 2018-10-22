const bodyParser = require('body-parser')
const express = require('express')
const moment = require('moment')

const db = require('../base/db')
const winston = require('../base/logger')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const User = require('../models/User')

router.get('/', (req, res) => {
    new Promise((resolve, reject) => {
        const role = req.query.role
        db.query(role === undefined ? User.getUsers() : User.getUsersByRole(typeof(role) === 'string' ? role : role[0]), (err, data, _) => {
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
        db.query(User.getGuard(req.params.id), (err, data, _) => {
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

router.post('/login', (req, res) => {    
    const params = req.body
    if (params.username === undefined) {
        res.status(400).json({ code: '', message: 'username is required' })
        return
    }
    if (params.password === undefined) {
        res.status(400).json({ code: '', message: 'password is required' })
        return
    }
    new Promise((resolve, reject) => {
        db.query(User.loginUser(params), (err, data, _) => {
            if (err == null)
                resolve(data)
            else 
                reject(err)
        })
    }).then((resolve) => {
        const users = JSON.parse(JSON.stringify(resolve))
        if (users.length > 0) {
            const user = users[0]
            if (user.role === 'guard') {
                winston.info(user)
                res.status(200).send(user)
            } else {
                winston.error('User is not a Guard')
                res.status(400).json( { code: '', message: 'User is not a Guard' } )
            }
        } else {
            winston.error('User does not exist')
            res.status(400).json( { code: '', message: 'User does not exist' } )
        }
    }).catch((reject) => {
        winston.error(reject)
        res.status(400).json( { code: reject.code, message: reject.sqlMessage } )
    }) 
})

module.exports = router