import moment from 'moment';

export default function backupAdvances (advances) {
    let aux = {
        ...advances,
        dniEmployee: advances.nroDNI,
        date: moment(advances.date).format('YYYY-MM-DD'),
        amount: advances.amount,
        installments: [{amount: 0, label: ""}],
        pay: advances.pay,
        months: 0,
        dateOld: moment(advances.date).format('YYYY-MM-DD'),
        reading: false
    }
    return aux;
}