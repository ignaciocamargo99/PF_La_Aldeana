import formattedDate from "../../../utils/formattedDate";
import dateText from "../../../utils/DateFormat/dateText";

export default function setInstallmentsMonths(data, toPay, month) {
    let installmentsMonths = [];
    let year = parseInt(data.date.slice(0,-3));
    let monthD = parseInt(data.date.slice(5,-3));
    
    for (let i = 0; i < month; i ++){

        let date = new Date(year, monthD+i+1)
        if (i + 1 == month && toPay !== 0){
            installmentsMonths[i] = { month: formattedDate(date), amount: parseInt(~~(data.installments_amount) + toPay), label: dateText(date) }
        } else {
            installmentsMonths[i] = { month: formattedDate(date), amount: ~~(data.installments_amount), label: dateText(date) };
        }
    }

    return installmentsMonths;
}