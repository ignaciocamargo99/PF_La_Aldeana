const { logInDB, getUserDB, loginDesktop } = require('../db/logInDB');

const logIn = async (user) => {
    try {
        let res = await logInDB(user);
        return res;
    }
    catch {
        let res = await logInDB(user);
        throw new Error("Error al extraer token de sesión - " + res.sqlMessage);
    };
};

const getUser = async (user) => {
    try {
        let res = await getUserDB(user);
        return res;
    }
    catch {
        let res = await getUserDB(user);
        throw new Error("Error al extraer datos de sesión - " + res.sqlMessage);
    };
};

const logInDesktop = async (user) => {
    try {
        let res = await loginDesktop(user);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};


module.exports = { logIn, getUser, logInDesktop }