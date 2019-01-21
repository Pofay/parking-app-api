const { expect } = require('chai')
const { Occupation } = require('../bookshelf/models')
const {
  occupyParkingLot,
  isNotCurrentlyOccupied,
  unoccupyParkingLot
} = require('../domain/parking')

describe('Unoccupy Parking Lot', () => {
  afterEach(done => {
    Occupation.where({ lotName: 'D5' })
      .destroy()
      .then(() => done())
      .catch(() => done())
  })

  it('Should unoccupy a occupied parking lot', done => {
    const expected = true

    occupyParkingLot('D5', '16-1799-579')
      .chain(() => unoccupyParkingLot('D5', '16-1799-579'))
      .chain(() => isNotCurrentlyOccupied('D5'))
      .fork(
        err => {
          console.error(err)
          expect.fail('Should return true to signify unoccupy')
          done()
        },
        success => {
          expect(success).to.equal(expected)
          done()
        }
      )
  })

  it('Should return an error message when there is no active occupation for lotName and idNumber', done => {
    const expected = 'No Active Occupation for 16-1799-579 at D5'

    unoccupyParkingLot('D5', '16-1799-579').fork(
      err => {
        expect(err).to.equal(expected)
        done()
      },
      success => {
        expect.fail('Should return an error message')
        done()
      }
    )
  })
})
