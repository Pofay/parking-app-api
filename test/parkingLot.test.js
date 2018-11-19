const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const { app } = require('../app')

chai.use(chaiHttp)

describe('/parking_lot route should', () => {

  it('return a Json of Format { data:  { parkingAreas: [ { areaName: <name>, parkingLots: [{parkingLots}]  ] } }', (done) => {

    const expected = { areaName: 'New Academic Building', 
    parkingLots: [
      { id: 2, name: 'B1', status: 0 },
      { id: 3, name: 'B2', status: 0 }
    ]}

    chai.request(app)
      .get('/parking_lot')
      .end((err, res) => {
        expect(res.body).to.deep.include(expected)
        done()
      })
  })
})





