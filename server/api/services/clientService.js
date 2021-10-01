const { clientGetDB } = require('../db/clientDb');

const readClient = async () => {
    try {
        let res = await clientGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readClient };