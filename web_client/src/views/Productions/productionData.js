import moment from "moment";

const PORT = require('../../config');

export default function productionData(production) {
    let date_production;

    if(PORT() === '') date_production = moment(production.date_production).format('YYYY-MM-DD')
    else date_production = moment(production.date_production).add(1, 'days').format('YYYY-MM-DD')

    let aux = {
        id_production : production.id_production,
        date_production,
        id_flavor: production.id_flavor,
        quantity: production.quantity,
        description: production.description,
        name: production.name,
        total_quantity: production.total_quantity
    }
    return aux;

}