const getParkings = () => {
    return 'SELECT * FROM tbl_parking'
}

const getParkingByID = (id) => {
    return 'SELECT * FROM tbl_parking WHERE id = ' +  id
}

const updateParkingUpdatedDate = (id, updated_date) => {
    return 'UPDATE tbl_parking SET updated_date = \'' + updated_date + '\' WHERE id = ' + id
}

module.exports = {
    getParkings: getParkings,
    getParkingByID: getParkingByID,
    updateParkingUpdatedDate: updateParkingUpdatedDate
}
