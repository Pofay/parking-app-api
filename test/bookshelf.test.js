const { expect } = require('chai')
const { ParkingArea } = require('../bookshelf/models')


describe('Bookshelf Models', () => {
  it('Get first Parking Area', (done) => {
    ParkingArea.where('id', 1).fetch().then(result =>{
      console.log(result)
      done()

    })

  })
})
