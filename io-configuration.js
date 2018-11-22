const { ParkingLots } = require('./bookshelf/models')

function configure(io) {
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
}

module.exports.configure = configure
