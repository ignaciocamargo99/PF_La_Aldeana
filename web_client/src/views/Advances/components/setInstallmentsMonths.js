import formattedDate from "../../../utils/formattedDate";
import dateText from "../../../utils/DateFormat/dateText";

export default function setInstallmentsMonths(data, toPay, month, amountTotal) {
    let installmentsMonths = [];
    let year = parseInt(data.date.slice(0,-3));
    let monthD = parseInt(data.date.slice(5,-3));
    let aux = 0;

    for (let i = 0; i < month; i ++){

        let date = new Date(year, monthD+i+1)

        if (i + 1 == month && toPay !== 0){
            installmentsMonths[i] = { month: formattedDate(date), amount: (amountTotal - data.pay)-aux, label: dateText(date) }
        } else {
            installmentsMonths[i] = { month: formattedDate(date), amount: parseInt((amountTotal - data.pay)/month), label: dateText(date) };
            aux += parseInt((amountTotal - data.pay)/month);
        }
    }

    return installmentsMonths;
}