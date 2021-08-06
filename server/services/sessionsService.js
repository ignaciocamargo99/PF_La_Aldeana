const { logInDB } = require('../models/logInDB');

const logIn = async (user) => {
    try {
        let res = await logInDB(user);
        return res;
    }
    catch {
        let res = await logInDB(user);
        throw new Error("Error al iniciar sesión - " + res.sqlMessage);
    };
};


module.exports = { logIn }