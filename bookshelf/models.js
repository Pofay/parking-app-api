const bookshelf = require('../base/bookshelf')

const ParkingLots = bookshelf.Model.extend({
  tableName: 'tbl_parking_lot',
  parkingArea: function () {
    return this.belongsTo(ParkingArea, 'parking_area_id', 'parking_area_id')
  },
  occupants: function () {
    return this.belongsToMany(Occupant).through(Occupation)
  }
})

const ParkingArea = bookshelf.Model.extend({
  tableName: 'tbl_parking_area',
  parking_lots: function () {
    return this.hasMany(ParkingLots, 'parking_area_id')
  }
})

const Occupant = bookshelf.Model.extend({
  tableName: 'tbl_occupant',
  parking_lots: function () {
    return this.belongsToMany(ParkingLots).through(Occupation)
  }
})

const Occupation = bookshelf.Model.extend({
  tableName: 'tbl_occupation',
  parkingLot: function () {
    this.belongsTo(ParkingLots, 'lotName', 'name')
  },
  occupant: function () {
    this.belongsTo(Occupant, `occupant_id_number`, `school_id_number`)
  }
})

module.exports = { ParkingArea, ParkingLots, Occupant, Occupation }
