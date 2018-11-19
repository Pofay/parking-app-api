const { expect } = require('chai')
const { ParkingArea, ParkingLots } = require('../bookshelf/models')


describe('Bookshelf Models', () => {
  it('Get first Parking Area', (done) => {
    ParkingArea.where('id', 1).fetch().then(result =>{
      expect(result.get('name')).to.equal('New Academic Building')
      done()
    })
  })

  it('Get At least one Associated Parking Lot of Area 2', (done) => {
    ParkingArea.where('id', 2).fetch({withRelated: ['parking_lots']}).then(result =>{
      const expected = {
        id: 60,
        parking_area_id: 2,
        name: 'D1',
        status: 1,
        created_date: '',
        updated_date: ''
      }
      const actual = result.related('parking_lots').toJSON()
      expect(actual).to.deep.include(expected)
      done()
    })
  })

  it('Update a ParkingLot By Id', (done) => {
    ParkingLots.where('id', 61).fetch()
      .then(result =>  result.set('status', 1).save())
      .then(result => {
        const expected = 1
        const actual = result.get('status')
        expect(actual).to.equal(expected)
        return ParkingLots.where('id', 61).fetch()
      }).then(result => result.set('status',0).save())
      .then(result => done())
  })
})
