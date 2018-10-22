const getPersonTypes = () => {
    return 'SELECT * FROM tbl_person_type'
}

const getPersonTypeByID = (id) => {
    return 'SELECT * FROM tbl_person_type WHERE id = ' +  id
}

module.exports = {
    getPersonTypes: getPersonTypes,
    getPersonTypeByID: getPersonTypeByID
}
