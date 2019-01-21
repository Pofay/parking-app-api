const parkingRepo = require('./parking-repo')
const {
  occupyParkingLot,
  getActiveOccupationForLot
} = require('./domain/parking')

function setup (socketIO, mqttClient) {
  mqttClient.on('connect', () => {
    console.log('Now connected to Mqtt Broker at 192.168.0.113:1883')
    mqttClient.subscribe('parkingLot/status-change')
    mqttClient.subscribe('parkingLot/getInitialState')
    mqttClient.subscribe('parkingLot/occupy')
    console.log('Subscribing to topic: parkingLot/status-change')
  })

  mqttClient.on('message', (topic, message) => {
    const payload = JSON.parse(message)
    console.log(`Recevied topic: ${topic} ,message: ${message}`)
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
            err => console.error(err),
            payload => socketIO.emit('status-changed', payload)
          )
        break
      case 'parkingLot/getInitialState':
        getActiveOccupationForLot(payload.lotName).fork(
          err => {
            console.error(err)
            const response = {
              lotName: payload.lotName,
              status: 'UNOCCUPIED'
            }
            mqttClient.publish(
              'parkingLot/initialState',
              JSON.stringify(response)
            )
          },
          success => {
            mqttClient.publish(
              'parkingLot/initialState',
              JSON.stringify(success)
            )
          }
        )
        break

      case 'parkingLot/occupy':
        occupyParkingLot(payload.lotName, payload.idNumber)
          .chain(() => getActiveOccupationForLot(payload.lotName))
          .fork(
            err => {
              console.error(err)
              mqttClient.publish(
                'parkingLot/occupyError',
                JSON.stringify({ lotName: payload.lotName, reason: err })
              )
            },
            success =>
              mqttClient.publish('parkingLot/occupied', JSON.stringify(success))
          )
        break
    }
  })
}
module.exports.setup = setup
