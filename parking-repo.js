const Future = require('fluture')
const { ParkingLots } = require('./bookshelf/models')

const getParkingLotByName = (lotName) => 
  Future.tryP(() => ParkingLots.where('name', lotName).fetch())

const setParkingLotStatus = (parkingLot, status) =>
  Future.tryP(() => parkingLot.set('status',status).save())


const updateStatusByName = (status, name) => {
  return getParkingLotByName(name)
    .chain(res => setParkingLotStatus(res, status))
}

module.exports.updateStatusByName = updateStatusByName


