const parkingRepo = require('./parking-repo')
const { Comments, Violation } = require('./bookshelf/models')

function configure (io, mqttClient) {
  io.on('connection', socket => {
    console.log('A User has Connected')

    socket.on('status-change', parkingLot => {
      parkingRepo
        .updateStatusByName(parkingLot.status, parkingLot.name)
        .map(res => res.toJSON())
        .map(res => ({
          parkingLot: {
            id: res.id,
            parking_area_id: res.parking_area_id,
            name: res.name,
            status: res.status
          }
        }))
        .fork(
          err => console.err(err),
          payload => io.emit('status-changed', payload)
        )
    })

    socket.on('parkingLot/occupy', payload => {
      console.log(payload)
      mqttClient.publish('parkingLot/occupy', JSON.stringify(payload))
    })

    socket.on('parkingLot/unoccupy', payload => {
      console.log(payload)
      mqttClient.publish('parkingLot/unoccupy', JSON.stringify(payload))
    })

    socket.on('violations/add', payload => {
      Violation.forge({
        occupant_id: payload.idNumber,
        rule_violated: payload.violatedRule,
        additional_notes: payload.additionalNotes,
        status: 'NEW'
      })
        .save()
        .then(model => io.emit('violations/added', model))
        .catch(err => io.emit('violations/addError', err))
    })

    socket.on('add-comment', payload => {
      console.log(payload)
      Comments.forge({
        name: payload.name,
        comment: payload.comment
      }).save()
        .then(model => io.emit('added-comment', model))
    })

    socket.on('get-comments', payload => {
      Comments.forge()
        .fetchAll()
        .then(result => result.toJSON())
        .then(result => ({ data: result }))
        .then(data => io.emit('got-comments', data))
    })

    socket.on('violations/delete', payload => {
      Violation.where('id', payload.violationId)
        .destroy()
        .then(m => io.emit('violations/deleted', payload.violationId))
        .catch(err => io.emit('violations/deleteError', err))
    })

    socket.on('violations/update', payload => {
      Violation.where('id', payload.violationId)
        .fetch()
        .then(model =>
          model
            .set({
              occupant_id: payload.occupantId,
              rule_violated: payload.violatedRule,
              additional_notes: payload.additionalNotes,
              status: payload.violationStatus
            })
            .save()
        )
        .then(model => io.emit('violations/updated', model))
        .catch(err => io.emit('violations/updateError', err))
    })

    socket.on('disconnect', () => {
      console.log('A User has Disconnected')
    })
  })
}

module.exports.configure = configure
