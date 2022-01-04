const { clientGetDB, clientPostDB, clientPutDB } = require('../db/clientDb');

const readClient = async (cellphone) => {
    try {
        let res = await clientGetDB(cellphone);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createClient = async (newClient) => {
    try {
        await clientPostDB(newClient);
    }
    catch (error) {
        throw Error(error);
    };
};

const modifyClient = async (cellphone,address) => {
    try {
        await clientPutDB(cellphone,address);
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { readClient, createClient, modifyClient };