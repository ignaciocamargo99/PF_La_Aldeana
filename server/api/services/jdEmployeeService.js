const { jdEmployeeGetDB } = require('../db/jdEmployeeDB');

const readJDEmployee = async (params) => {
    try {
        let res = await jdEmployeeGetDB(params);
        return res;
    }
    catch (error){
        throw Error(error)
    };
};

module.exports = { readJDEmployee }