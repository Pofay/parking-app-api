const { Violation } = require('../bookshelf/models')
const express = require('express')

const router = express.Router()

module.exports = function () {
  router.get('/', (req, res) => {
    Violation.forge()
      .fetchAll({ withRelated: ['occupant'] })
      .then(result => result.toJSON())
      .then(result => ({ data: result }))
      .then(data => res.status(200).json(data))
  })

  return router
}
