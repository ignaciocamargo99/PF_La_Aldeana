import Axios from 'axios';
import { parseStartDate } from '../customHooks/parseStartDate'

const PORT = require('../../../config');

const getWholeSales = async (status, startDate, endDate) => {
    let wholeSalesResponse = {};

    if (status === 'PENDING') {
        await Axios.get(`${PORT()}/api/salesBranches?status=PENDING`)
            .then(response => {
                wholeSalesResponse = response.data
            })
            .catch((error) => console.log(error));
    }
    else {
        let parseNewStartDate = parseStartDate(startDate)
        await Axios.get(`${PORT()}/api/salesBranches?startDate=${parseNewStartDate}&endDate=${endDate}&status=FINISH`)
            .then(response => {
                wholeSalesResponse = response.data
            })
            .catch((error) => console.log(error));
    }

    return wholeSalesResponse;
};

export default getWholeSales;