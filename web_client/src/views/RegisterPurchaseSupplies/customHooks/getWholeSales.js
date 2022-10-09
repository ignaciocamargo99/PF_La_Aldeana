import Axios from 'axios';
import { parseStartDate } from '../customHooks/parseStartDate'

const PORT = require('../../../config');

const getWholeSales = async (status, startDate, endDate) => {
    let wholeSalesResponse = {};

    if (status === 'PENDING') {
        await Axios.get(`${PORT()}/api/purchases`)
            .then(response => {
                wholeSalesResponse = response.data
            })
            .catch((error) => console.log(error));
    }
    else {
        let parseNewStartDate = parseStartDate(startDate)
        await Axios.get(`${PORT()}/api/purchases?from=${parseNewStartDate}&to=${endDate}`)
            .then(response => {
                wholeSalesResponse = response.data
            })
            .catch((error) => console.log(error));
    }

    return wholeSalesResponse;
};

export default getWholeSales;