import Axios from 'axios';

const PORT = require('../config');

export const getSupplies = async (conditions) => {
    let supplies;
    let params = {};
    
    // Actualmente solo puede filtrar por precio mayorista.
    // Agregar más filtros si se desea.

    if (conditions?.forWholesale !== undefined) { 
        params.forWholesale = conditions.forWholesale;
    }

    await Axios.get(`${PORT()}/api/v2/supplies`, { params: params })
        .then((response) => {
            supplies = response.data.supplies;
        })
        .catch((error) => {
            console.log(error);
            supplies = [];
        });

    return supplies;
}