const { expect } = require('chai')
const { Occupant, Occupation } = require('../bookshelf/models')
const { Future } = require('fluture')

describe('Learning Tests', () => {
  it('Query on empty', done => {
    Occupation.where({ lotName: 'D1', status: 'ACTIVE' })
      .fetch()
      .then(model => {
        console.log(model) // returns null
        done()
      })
  })

  // I might need to use a compound query since the schema doesn't fit well with bookshelf
  it('Query with backdoor', done => {
    Occupation.forge({
      lotName: 'D1',
      status: 'ACTIVE',
      occupant_id_number: '16-1799-579'
    })
      .save()
      .then(() => Occupation.where({ lotName: 'D1', status: 'ACTIVE' }).fetch())
      .then(data => data.toJSON())
      .then(data => {
        console.log(data)
        return Promise.resolve()
      })
      .then(() => Occupation.where({ lotName: 'D1' }).destroy())
      .then(() => done())
  })
})

describe('Query Parking Lot Occupant', () => {
  it('should return an message that lot is unoccupied when there are no occupations', done => {
    getActiveOccupationForLot('D2').fork(
      err => {
        expect(err).to.equal('No Current Occupation for D2')
        done()
      },
      success => {
        expect.fail('Should return an error message')
      }
    )
  })

  it('should return the occupant of parkingLot when there is an occupation', done => {
    const expected = {
      lotName: 'D1',
      status: 'OCCUPIED',
      occupant: { school_id_number: '16-1799-579', name: 'Gian Carlo Gilos' }
    }

    const compoundQuery = Future.do(function * () {
      yield occupyParkingLot('D1', '16-1799-579')
      const occupation = yield getActiveOccupationForLot('D1')
      const occupant = yield getOccupant(occupation.occupant_id_number)
      yield Future.tryP(() => Occupation.where({ lotName: 'D1' }).destroy())
      return attachOccupantToOccupation(occupant, occupation)
    })

    compoundQuery.fork(
      err => {
        console.error(err)
        expect.fail('Should execute!')
        done()
      },
      success => {
        expect(success).to.deep.equal(expected)
        done()
      }
    )
  })
})

const attachOccupantToOccupation = (occupant, occupation) => ({
  lotName: occupation.lotName,
  status: occupation.status,
  occupant
})

const getActiveOccupationForLot = parkingLotName =>
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

const occupyParkingLot = (lotName, idNumber) =>
  Future.tryP(() =>
    Occupation.forge({
      lotName: 'D1',
      status: 'OCCUPIED',
      occupant_id_number: '16-1799-579'
    }).save()
  )
