const { userPostDB } = require('../db/userDB');


const createUser = async (newUser, matrix) => {
    try {
        let res = await userPostDB(newUser, matrix);
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

module.exports = { createUser };