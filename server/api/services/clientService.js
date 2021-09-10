const { clientGetDB } = require('../db/clientDb');

const readClient = async () => {
    try {
        let res = await clientGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los sabores de helado.')
    };
};

module.exports = { readClient };