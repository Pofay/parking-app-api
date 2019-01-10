const { expect } = require('chai')
const { Occupation } = require('../bookshelf/models')
const { Future } = require('fluture')
const { occupyParkingLot, getActiveOccupationForLot } = require('../domain/parking')

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
        done()
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
      yield Future.tryP(() => Occupation.where({ lotName: 'D1' }).destroy())
      return occupation
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

describe('Occupying a Parking Lot', () => {
  beforeEach(done => {
    Occupation.forge({
      lotName: 'D1',
      status: 'OCCUPIED',
      occupant_id_number: '16-1799-579'
    })
      .save()
      .then(() => done())
  })

  afterEach(done => {
    Occupation.where({ lotName: 'D1' })
      .destroy()
      .then(() => done())
  })

  it('should not be able to occupy when parkingLot is currently occupied', done => {
    const expectedMessage = 'D1 is already occupied.'

    occupyParkingLot('D1', '16-5799-879').fork(
      err => {
        expect(err).to.equal(expectedMessage)
        done()
      },
      success => {
        expect.fail('Should return an error message')
        done()
      }
    )
  })

  it('should not be able to occupy when idNumber has a active occupation', done => {
    const expectedMessage = '16-1799-579 has an active occupation.'

    occupyParkingLot('D2', '16-1799-579').fork(
      err => {
        expect(err).to.equal(expectedMessage)
        done()
      },
      success => {
        expect.fail('Should return an error message')
        done()
      }
    )
  })
})
