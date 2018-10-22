const getParkingAreas = () => {
    return 'SELECT * FROM tbl_parking_area'
}

const getParkingAreaByID = (id) => {
    return 'SELECT * FROM tbl_parking_area WHERE id = ' +  id
}

module.exports = {
    getParkingAreas: getParkingAreas,
    getParkingAreaByID: getParkingAreaByID
}
