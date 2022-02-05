import moment from "moment";

export default function productionData(production) {

    let aux = {
        id_production : production.id_production,
        date_production : moment(production.date_production).format('YYYY-MM-DD'),
        id_flavor: production.id_flavor,
        quantity: production.quantity,
        description: production.description,
        name: production.name,
        total_quantity: production.total_quantity
    }
    return aux;

}