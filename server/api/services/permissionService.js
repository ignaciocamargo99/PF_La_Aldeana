const { permissionsGetDB, permissionsUserGetDB, viewsGetDB, permissionRolUpdateDB, accessesGetDB } = require('../db/permissionDB');

const readPermissions = async () => {
    try {
        let res = await permissionsGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readPermissionsUser = async (nick_user) => {
    try {
        let res = await permissionsUserGetDB(nick_user);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readViews = async () => {
    try {
        let res = await viewsGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const modifyPermissionRol = async (permissions) => {
    try {
        let res = await permissionRolUpdateDB(permissions);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const readAccesses = async () => {
    try {
        let res = await accessesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readPermissions, readPermissionsUser, readViews, modifyPermissionRol, readAccesses };
