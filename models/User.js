const getUsers = () => {
    return 'SELECT * FROM tbl_user'
}

const getUsersByRole = (role) => {
    return 'SELECT * FROM tbl_user WHERE role = \'' +  role + '\''
}

const getUser = (id) => {
    return 'SELECT * FROM tbl_user WHERE id = ' +  id
}

const loginUser = (params) => {
    return 'SELECT * FROM tbl_user WHERE username = \'' +  params.username + '\' AND password = \'' + params.password + '\''
}

module.exports = {
    getUsers: getUsers,
    getUsersByRole: getUsersByRole, 
    getUser: getUser,
    loginUser: loginUser
}
