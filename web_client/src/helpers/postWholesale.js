import Axios from 'axios';

const PORT = require('../config');

export const postWholesale = (payload) => {
    payload.status = 'FINISH';
    return Axios.post(`${PORT()}/api/salesBranches`, payload);
};
