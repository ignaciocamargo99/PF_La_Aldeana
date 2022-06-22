const { turnsGetDB } = require('../db/turnsDB');

const readTurns = async () => {
    try {
        let res = await turnsGetDB();
        return res;
    }
    catch (error){
        throw Error(error)
    };
};

module.exports = { readTurns }