const bookshelf = require('../base/bookshelf')


const ParkingLots = bookshelf.Model.extend({
  tableName: 'tbl_parking_lot',
  parkingArea: function () {
    return this.belongsTo(ParkingArea, 'parking_area_id' ,'parking_area_id')
  }
})

const ParkingArea = bookshelf.Model.extend({
  tableName: 'tbl_parking_area',
  parking_lots: function () {
    return this.hasMany(ParkingLots, 'parking_area_id')
  }
})


module.exports = { ParkingArea, ParkingLots}




