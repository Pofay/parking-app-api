const chai = require('chai')
const R = require('ramda')
const { expect } = chai
const chaiHttp = require('chai-http')
const { app } = require('../app')
const { ParkingLots } = require('../bookshelf/models')

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
      .get('/parking_lots')
      .end((err, res) => {
        const actual = res.body.data[0]
        const firstThreeEntries = R.take(3, actual.parkingLots)
        expect(actual.areaName).to.equal(expected.areaName)
        expect(firstThreeEntries).to.deep.equal(expected.parkingLots)
        done()
      })
  })

  it('Can query for for a specific Parking Lot by Id', (done) => {
    const expected = { id: 4, name: 'B3', status: 0 }

    chai.request(app)
      .get('/parking_lots/4')
      .end((err, res) => {
        const actual = R.prop('parkingLot', res.body.data)
        expect(actual).to.deep.equal(expected)
        done()
      })
  })

  it('Can update the status of a parkingLot by Name', (done) => {

    const expected = { parkingLot : { parking_area_id: 1, id: 5, name: 'B4', status: 1 } }

    chai.request(app)
      .put('/parking_lots/status')
      .send({ lotName: 'B4', status: 1 })
      .end((err, res) => {
        const actual = res.body.data
        expect(actual).to.deep.equal(expected)
        done()
      })
  })

})





