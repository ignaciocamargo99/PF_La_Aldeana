import dateToString from "../../../utils/ConverterDate/dateToString";

export default function setInstallmentsMonths(data, toPay, month) {
    let installmentsMonths = [];
    let date = parseInt(data.date.slice(5,-3));
    console.log(date)
    
    for (let i = 0; i < month; i ++){
        if (i + 1 === month && toPay % 1 !== 0){
            installmentsMonths[i] = { month: date + i +1, amount: data.installments_amount }
        } else {
            installmentsMonths[i] = { month: date + i +1, amount: ~~(data.installments_amount) };
        }
    }

    return installmentsMonths;
}