const { clientGetDB, clientPostDB, clientPutDB } = require('../db/clientDb');

const readClient = async () => {
    try {
        let res = await clientGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los sabores de helado.')
    };
};

const createClient = async (newClient) => {
    try {
        await clientPostDB(newClient);
    }
    catch {
        let res = await clientPostDB(newClient);
        throw Error(res);
    };
};

const modifyClient = async (cellphone,address) => {
    try {
        await clientPutDB(cellphone,address);
    }
    catch {
        let res = await clientPutDB(cellphone,address);
        throw Error(res);
    };
};

module.exports = { readClient, createClient, modifyClient };