import Axios from 'axios';

const PORT = require('../config');

export const getSupplies = async () => {
    let supplies;

    await Axios.get(`${PORT()}/api/supplies`)
        .then((response) => {
            supplies = response.data;
        })
        .catch((error) => {
            console.log(error);
            supplies = [];
        });

    return supplies;
}