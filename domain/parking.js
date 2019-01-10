const { Occupant, Occupation } = require('../bookshelf/models')
const Future = require('fluture')

const getActiveOccupationForLot = parkingLotName =>
  Future.do(function * () {
    const occupation = yield queryActiveOccupationFor(parkingLotName)
    const occupant = yield getOccupant(occupation.occupant_id_number)
    return attachOccupantToOccupation(occupant, occupation)
  })

const queryActiveOccupationFor = parkingLotName =>
  Future.tryP(() =>
    Occupation.where({ lotName: parkingLotName, status: 'OCCUPIED' }).fetch()
  ).chain(data =>
    data === null
      ? Future.reject(`No Current Occupation for ${parkingLotName}`)
      : Future.of(data.toJSON())
  )

const getOccupant = idNumber =>
  Future.tryP(() =>
    Occupant.where({ school_id_number: idNumber }).fetch()
  ).chain(data =>
    data === null
      ? Future.reject(`No Occupant with ${idNumber}`)
      : Future.of(data.toJSON())
  )

const attachOccupantToOccupation = (occupant, occupation) => ({
  lotName: occupation.lotName,
  status: occupation.status,
  occupant
})

const occupyParkingLot = (lotName, idNumber) =>
  hasNoActiveOccupation(idNumber)
    .chain(val =>
      val === true
        ? Future.of()
        : Future.reject(`${idNumber} has an active occupation.`)
    )
    .chain(() => isNotCurrentlyOccupied(lotName))
    .chain(val =>
      val === true
        ? Future.of()
        : Future.reject(`${lotName} is already occupied.`)
    )
    .chain(() =>
      Future.tryP(() =>
        Occupation.forge({
          lotName: lotName,
          status: 'OCCUPIED',
          occupant_id_number: idNumber
        }).save()
      )
    )

const isNotCurrentlyOccupied = lotName =>
  Future.tryP(() =>
    Occupation.where({ lotName: lotName, status: 'OCCUPIED' }).fetch()
  ).chain(data => (data === null ? Future.of(true) : Future.of(false)))

const hasNoActiveOccupation = idNumber =>
  Future.tryP(() =>
    Occupation.where({
      occupant_id_number: idNumber,
      status: 'OCCUPIED'
    }).fetch()
  ).chain(data => (data === null ? Future.of(true) : Future.of(false)))

module.exports = { occupyParkingLot, getActiveOccupationForLot }
