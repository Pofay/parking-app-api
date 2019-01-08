const parkingRepo = require('./parking-repo')

function setup (socketIO, mqttClient) {
  mqttClient.on('connect', () => {
    console.log('Now connected to Mqtt Broker at 192.168.0.113:1883')
    mqttClient.subscribe('parkingLot/status-change')
    console.log('Subscribing to topic: parkingLot/status-change')
  })

  mqttClient.on('message', (topic, message) => {
    console.log(`Recevied topic: ${topic} ,message: ${message}`)
    const payload = JSON.parse(message) // Catch expected error here
    switch (topic) {
      case 'parkingLot/status-change':
        parkingRepo
          .updateStatusByName(payload.status, payload.lotName)
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
            payload => socketIO.emit('status-changed', payload)
          )
    }
  })
}

module.exports.setup = setup
