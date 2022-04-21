import Axios from 'axios';

const PORT = require('../config');

export const getActiveFlavors = async () => {
    let activeFlavors = [];

    await Axios.get(`${PORT()}/api/activeFlavors`)
        .then((response) => {
            activeFlavors = response.data
        })
        .catch((error) => console.log(error));

    return activeFlavors;
};
