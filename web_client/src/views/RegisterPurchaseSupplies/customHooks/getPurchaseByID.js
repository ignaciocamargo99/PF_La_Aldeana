import Axios from 'axios';

const PORT = require('../../../config');

export const getPurchaseByID = (purchaseId) => {
    return Axios.get(`${PORT()}/api/purchases/${purchaseId}`);
};
