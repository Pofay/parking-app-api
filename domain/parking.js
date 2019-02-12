const { Occupant, Occupation } = require('../bookshelf/models')
const Future = require('fluture')

const getActiveOccupationForLot = parkingLotName =>
  Future.do(function * () {
    const occupation = yield queryActiveOccupationFor(parkingLotName)
    return formatOccupationData(occupation)
  })

const unoccupyParkingLot = (lotName, idNumber) =>
  Future.tryP(() =>
    Occupation.where({
      lotName: lotName,
      occupant_id_number: idNumber,
      status: 'OCCUPIED'
    }).fetch()
  ).chain(data =>
    data === null
      ? Future.reject(`No Active Occupation for ${idNumber} at ${lotName}`)
      : Future.tryP(() => data.set({ status: 'UNOCCUPIED' }).save())
  )

const getAllActiveOccupations = () =>
  Future.tryP(() =>
    Occupation.where({ status: 'OCCUPIED' }).fetchAll({
      withRelated: ['occupant']
    })
  )
    .map(result => (result.toJSON()))
    .map(result => (result.map(formatOccupationData)))

const queryActiveOccupation = parkingLotName =>
  Future.tryP(() =>
    Occupation.where({ lotName: parkingLotName, status: 'OCCUPIED' }).fetch({
      withRelated: 'occupant'
    })
  )

const queryActiveOccupationFor = parkingLotName =>
  queryActiveOccupation(parkingLotName).chain(data =>
    data === null
      ? Future.reject(`No Current Occupation for ${parkingLotName}`)
      : Future.of(data.toJSON())
  )

const formatOccupationData = occupation => ({
  lotName: occupation.lotName,
  status: occupation.status,
  occupant: occupation.occupant
})

const occupyParkingLot = (lotName, idNumber) =>
  exists(idNumber)
    .map(d => d.school_id_number)
    .chain(hasNoActiveOccupation)
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
  queryActiveOccupation(lotName).chain(data =>
    data === null ? Future.of(true) : Future.of(false)
  )

const hasNoActiveOccupation = idNumber =>
  Future.tryP(() =>
    Occupation.where({
      occupant_id_number: idNumber,
      status: 'OCCUPIED'
    }).fetch()
  ).chain(data => (data === null ? Future.of(true) : Future.of(false)))

const exists = idNumber =>
  Future.tryP(() =>
    Occupant.where({
      school_id_number: idNumber
    }).fetch()
  ).chain(data => (data === null ? Future.reject(`No Registered Occupant with that ${data}`) : Future.of(data.toJSON())))

module.exports = {
  occupyParkingLot,
  getActiveOccupationForLot,
  isNotCurrentlyOccupied,
  getAllActiveOccupations,
  unoccupyParkingLot
}
