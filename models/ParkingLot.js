const getParkingLots = () => {
    return 'SELECT * FROM tbl_parking_lot'
}

const getParkingLotsByNames = (names) => {
    return 'SELECT * FROM tbl_parking_lot WHERE name IN (' + JSON.parse(names).map(name => '\'' + name + '\'') + ')'
}

const getParkingLotByID = (id) => {
    return 'SELECT * FROM tbl_parking_lot WHERE id = ' +  id
}

const updateParkingLotStatus = (id, status) => {
    return 'UPDATE tbl_parking_lot SET status = ' + status + ' WHERE id = ' + id
}

module.exports = {
    getParkingLots: getParkingLots,
    getParkingLotsByNames: getParkingLotsByNames,
    getParkingLotByID: getParkingLotByID,
    updateParkingLotStatus: updateParkingLotStatus
}
