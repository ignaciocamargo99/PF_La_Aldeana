import Axios from 'axios';

const PORT = require('../config');

export const getSectors = async () => {
    let sectors;

    await Axios.get(`${PORT()}/api/sectors`)
        .then((response) => {
            sectors = response.data.sectors;
        })
        .catch((error) => {
            console.log(error);
            sectors = [];
        });

    return sectors;
}