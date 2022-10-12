import Axios from 'axios';
import { parseStartDate } from './parseStartDate'

const PORT = require('../../../config');

const getPurchases = async (status, startDate, endDate) => {
    let purchaseResponse = {};

    if (status === 'PENDING') {
        await Axios.get(`${PORT()}/api/purchases`)
            .then(response => {
                purchaseResponse = response.data
            })
            .catch((error) => console.log(error));
    }
    else {
        let parseNewStartDate = parseStartDate(startDate)
        await Axios.get(`${PORT()}/api/purchases?from=${parseNewStartDate}&to=${endDate}`)
            .then(response => {
                purchaseResponse = response.data
            })
            .catch((error) => console.log(error));
    }

    return purchaseResponse;
};

export default getPurchases;