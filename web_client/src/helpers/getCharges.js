import Axios from 'axios';

const PORT = require('../config');

export const getCharges = async () => {
    let charges = [];

    await Axios.get(`${PORT()}/api/charges`)
        .then((response) => {
            charges = response.data
        })
        .catch((error) => console.log(error));

    return charges;
}