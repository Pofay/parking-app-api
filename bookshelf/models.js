const bookshelf = require('../base/bookshelf')

const ParkingArea = bookshelf.Model.extend({
  tableName: 'tbl_parking_area',
  parking_lots: function () {
    return this.hasMany(ParkingLots)
  }
})

const ParkingLot = bookshelf.Model.extend({
  tableName: 'tbl_parking_lot',
  parkingArea: function () {
    return this.belongsTo(ParkingArea)
  }
})

module.exports = { ParkingArea, ParkingLot }




