const { permissionsGetDB, permissionsRolGetDB } = require('../db/permissionDB');

const readPermissions = async () => {
    try {
        let res = await permissionsGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readPermissionsRol = async (rol) => {
    try {
        let res = await permissionsRolGetDB(rol);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readPermissions, readPermissionsRol };
