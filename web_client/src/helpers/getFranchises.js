import Axios from 'axios';

const PORT = require('../config');

export const getFranchises = async () => {
    let franchises = [];

    await Axios.get(`${PORT()}/api/franchises`)
        .then(response => {
            franchises = response.data
        })
        .catch((error) => console.log(error));

    return franchises;
};