const parkingRepo = require('./parking-repo')

function configure (io) {
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

    socket.on('disconnect', () => {
      console.log('A User has Disconnected')
    })
  })
}

module.exports.configure = configure
