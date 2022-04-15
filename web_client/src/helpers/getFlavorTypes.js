import Axios from 'axios';

const PORT = require('../config');

export const getFlavorTypes = async () => {
    let flavorTypesResponse = {};

    await Axios.get(`${PORT()}/api/typeFlavors`)
        .then(response => {
            flavorTypesResponse = response
        })
        .catch((error) => console.log(error));

    return flavorTypesResponse;
};
