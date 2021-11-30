import formattedDate from "../../../utils/formattedDate";
import dateText from "../../../utils/DateFormat/dateText";

export default function setInstallmentsMonths(month, months, amountTotal, installments) {
    let installmentsMonths = [];
    let year = parseInt(month.slice(0,-3));
    let monthD = parseInt(month.slice(5,-3));
    let aux = 0;

    let monthN = year + '-' + monthD + '-' + '01';

    for (let i = 0; i < months; i ++){

        let m = monthD+i > 12 ? monthD+i - 12 * (parseInt((monthD+i)/12-1) + (((monthD+i)/12-1)%1 !== 0 ? 1 : 0)) : monthD+i;
        let yearD = year + parseInt((monthD+i)/12-1) + (((monthD+i)/12-1)%1 !== 0 ? 1 : 0);
        let date = yearD + '-' + m + '-' + '01';

        if (parseInt(i + 1) === parseInt(months) && (amountTotal/months)%1 !== 0){
            if (installments.length > i) {
                if (!installments[i].pay) {
                    installmentsMonths[i] = { month: date, amount: amountTotal-aux, label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                    if (i === 0) installmentsMonths[i] = { month: monthN, amount:  amountTotal-aux, label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                } else {
                    installmentsMonths[i] = installments[i];
                }
            } else {
                installmentsMonths[i] = { month: date, amount: amountTotal-aux, label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                if (i === 0) installmentsMonths[i] = { month: monthN, amount:  amountTotal-aux, label: dateText(new Date(year, monthD+i-1)), pay: 0 };
            }
        } else {
            if (installments.length > i) {
                if (!installments[i].pay){
                    installmentsMonths[i] = { month: date, amount: parseInt(amountTotal/months), label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                    if (i === 0) installmentsMonths[i] = { month: monthN, amount: parseInt(amountTotal/months), label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                    aux += parseInt(amountTotal/months);
                } else {
                    installmentsMonths[i] = installments[i];
                    console.log(installmentsMonths[i])
                    aux += installments[i].amount;
                }
            } else {
                installmentsMonths[i] = { month: date, amount: parseInt(amountTotal/months), label: dateText(new Date(year, monthD+i-1)), pay: 0 };
                if (i === 0) installmentsMonths[i] = { month: monthN, amount: parseInt(amountTotal/months), label: dateText(new Date(year, monthD+i-1)), pay: 0 };
            }
        }
    }

    return installmentsMonths;
}