const {
    checkInOutDB,
    assistanceDB,
    allAssistanceDB
} = require('../db/assistenceFingerDB');

const getAssitance = async (dni) => {
    try {
        let res = await assistanceDB(dni);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

const registerAssitance = async (dni, datetime) => {
    try {
        let res = await checkInOutDB(dni, datetime);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

const getAssitanceAll = async () => {
    try {
        let res = await allAssistanceDB();
        return res;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = { registerAssitance, getAssitance, getAssitanceAll };
