const { checkInOutDB } = require('../db/assistenceFingerDB');

const registerAssitance = async (check) => {
    try {
        let res = await checkInOutDB(check);
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

module.exports = { registerAssitance };