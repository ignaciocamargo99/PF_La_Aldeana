const { PayTypesGetDB } = require('./db'); 

const readPayTypes = async () => {
    try {
        let res = await PayTypesGetDB();
        return res;
    }
    catch {
        let res = await PayTypesGetDB();
        throw Error(res);
    };
};

module.exports = { readPayTypes }