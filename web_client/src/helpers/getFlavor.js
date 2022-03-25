import Axios from 'axios';

const PORT = require('../config');

export const getFlavor = async (flavorId) => {
    let flavorResponse = {};

    await Axios.get(`${PORT()}/api/flavors/${flavorId}`)
        .then((response) => {
            flavorResponse = response.data
        })
        .catch((error) => console.log(error));

    return flavorResponse;
};
