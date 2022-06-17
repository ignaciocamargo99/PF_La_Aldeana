import Axios from 'axios';

const PORT = require('../config');

export const getProductTypes = async () => {
    let productTypes = [];

    await Axios.get(`${PORT()}/api/productTypes`)
        .then((response) => {
            productTypes = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return productTypes;
}