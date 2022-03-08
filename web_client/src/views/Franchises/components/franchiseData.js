
import moment from 'moment';

const PORT = require('../../../config');

export default function franchiseData (franchise) {
    let start_date;

    if(PORT() === '') start_date = moment(franchise.start_date).format('YYYY-MM-DD')
    else start_date = moment(franchise.start_date).add(1, 'days').format('YYYY-MM-DD')

    let aux = {
        id_franchise: franchise.id_franchise,
        name: franchise.name,
        city: franchise.city,
        address: franchise.address,
        address_number: franchise.address_number,
        province: franchise.province,
        name_manager: franchise.name_manager,
        last_name_manager: franchise.last_name_manager,
        dni_manager: franchise.dni_manager,
        start_date
    };
    return aux
}