const { getAllActiveOccupations } = require('../domain/parking')
const express = require('express')

const router = express.Router()

module.exports = function () {
  router.get('/', (req, res) => {
    getAllActiveOccupations().fork(
      err => {
        console.error(err)
        res.status(500).json({ error: err })
      },
      success => {
        res.status(200).json({ data: success })
      }
    )
  })

  return router
}
