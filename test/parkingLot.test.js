const chai = require('chai')
const R = require('ramda')
const { expect } = chai
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.use(chaiHttp)

describe('/parking_lot route should', () => {

  it('return a Json of Format { data:  { parkingAreas: [ { areaName: <name>, parkingLots: [{parkingLots}]  ] } }', (done) => {

    const expected = { areaName: 'New Academic Building', 
    parkingLots: [
      { id: 1, name: 'PWD', status: 1 },
      { id: 2, name: 'B1', status: 0 },
      { id: 3, name: 'B2', status: 0 }
    ]}

    chai.request(app)
      .get('/parking_lot')
      .end((err, res) => {
        const actual = res.body.data[0]
        const firstThreeEntries = R.take(3, actual.parkingLots)
        expect(actual.areaName).to.equal(expected.areaName)
        expect(firstThreeEntries).to.deep.equal(expected.parkingLots)
        done()
      })
  })
})





