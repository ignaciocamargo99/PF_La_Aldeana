const { userPostDB, userUpdateDB, userDeleteDB } = require('../db/userDB');


const createUser = async (newUser, matrix) => {
    try {
        let res = await userPostDB(newUser, matrix);
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

const modifyUser = async (id_user, newUser, matrix) => {
    try {
        let res = await userUpdateDB(id_user, newUser, matrix);
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

const userDelete = async (id_user) => {
    try {
        let res = await userDeleteDB(id_user);
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

module.exports = { createUser, modifyUser, userDelete };