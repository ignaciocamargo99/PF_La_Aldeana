import moment from "moment";

export default function productionData(production) {

    let aux = {
        date_production : moment(production.date_production).format('YYYY-MM-DD'),
        id_flavor: production.id_flavor,
        quantity: production.quantity,
        description: production.description,
        name: production.name
    }
    return aux;

}