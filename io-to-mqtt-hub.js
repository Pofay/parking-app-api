const { ParkingLots } = require('./bookshelf/models')

function setup(socketIO, mqttClient) {

  mqttClient.on('connect', () => {
    console.log('Now connected to Mqtt Broker at 192.168.0.113:1883')
    mqttClient.subscribe('parkingLot/status-change')
    console.log('Subscribing to topic: parkingLot/status-change')
  })

  mqttClient.on('message', (topic, message) => {
    console.log(`Recevied topic: ${topic} ,message: ${message}`)
    const payload = JSON.parse(message)
    switch(topic) {
      case 'parkingLot/status-change':
        ParkingLots.where('name', payload.lotName)
          .fetch()
          .then(res => res.set('status', payload.status).save())
          .then(res => Promise.resolve(res.toJSON()))
          .then(res => Promise.resolve(({ parkingLot: { id: res.id, parking_area_id: res.parking_area_id, name: res.name, status: res.status } })))
          .then(res => socketIO.emit('status-changed', res))
    }
  })
}

module.exports.setup = setup
