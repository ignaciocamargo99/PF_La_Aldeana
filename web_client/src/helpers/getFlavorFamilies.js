import Axios from 'axios';

const PORT = require('../config');

export const getFlavorFamilies = async () => {
    let flavorFamiliesResponse = {};

    await Axios.get(`${PORT()}/api/familyFlavors`)
        .then(response => {
            flavorFamiliesResponse = response
        })
        .catch((error) => console.log(error));

    return flavorFamiliesResponse;
};
