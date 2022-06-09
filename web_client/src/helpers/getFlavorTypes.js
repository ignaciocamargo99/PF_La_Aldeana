import Axios from 'axios';

const PORT = require('../config');

export const getFlavorTypes = async () => {
    let flavorTypesResponse = {};

    await Axios.get(`${PORT()}/api/flavorTypes`)
        .then(response => {
            flavorTypesResponse = response.data
        })
        .catch((error) => console.log(error));

    return flavorTypesResponse;
};
