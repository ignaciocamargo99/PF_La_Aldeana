import Axios from 'axios';

const PORT = require('../config');

export const getFlavorTypeByID = (flavorId) => {
    return Axios.get(`${PORT()}/api/flavorTypes/${flavorId}`);
};
