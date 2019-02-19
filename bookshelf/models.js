const bookshelf = require('../base/bookshelf')

const ParkingLots = bookshelf.Model.extend({
  tableName: 'tbl_parking_lot',
  parkingArea: function () {
    return this.belongsTo(ParkingArea, 'parking_area_id', 'parking_area_id')
  }
})

const ParkingArea = bookshelf.Model.extend({
  tableName: 'tbl_parking_area',
  parking_lots: function () {
    return this.hasMany(ParkingLots, 'parking_area_id')
  }
})

const Occupant = bookshelf.Model.extend({
  tableName: 'tbl_occupant'
})

const Occupation = bookshelf.Model.extend({
  tableName: 'tbl_occupation',
  parkingLot: function () {
    return this.belongsTo(ParkingLots, 'lotName', 'name')
  },
  occupant: function () {
    return this.belongsTo(Occupant, `occupant_id_number`, `school_id_number`)
  }
})

const Violation = bookshelf.Model.extend({
  tableName: 'tbl_violation',
  occupant: function () {
    return this.belongsTo(Occupant, `occupant_id`, `school_id_number`)
  }
})

const Comments = bookshelf.Model.extend({
  tableName: 'tbl_comment'
})

module.exports = { Comments, ParkingArea, ParkingLots, Occupant, Occupation, Violation }
