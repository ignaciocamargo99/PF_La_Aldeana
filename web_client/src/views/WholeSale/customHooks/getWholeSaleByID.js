import Axios from 'axios';

const PORT = require('../../../config');

export const getWholeSaleByID = (wholeSaleId) => {
    return Axios.get(`${PORT()}/api/salesBranches/${wholeSaleId}`);
};
