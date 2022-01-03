import dateToString from "../../../utils/ConverterDate/dateToString";

export default function formatInstallments(ins){
    let aux = [];

    ins?.forEach((e, i) => {
        aux[i] = {
            amount: e.amount,
            date: dateToString(e.date, true),
            label: e.label,
            month: dateToString(e.month, true),
            nroDNI: e.nroDNI,
            pay: e.pay
        }
    });

    return aux;
}