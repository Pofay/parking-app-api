module.exports = function setup(socketIO, mqttClient) {
  mqttClient.on('message', (topic, message) => {
    const payload = JSON.parse(message)
    switch(topic) {
      case 'parkingLot/status-change':
        // Update specific ParkingLot by name based on status value
        // then emit changed value to browser clients via socket.io
    }

  })
}
