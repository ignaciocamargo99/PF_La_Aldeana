const PORT = require('../../../config')

export const parseStartDate = (strDate) => {
    let newStartDate;
    let day;
    const dateFormat = new Date(strDate)
    if (PORT() === '') day = dateFormat.getDate();
    else day = dateFormat.getDate() + 1;
    let monthStart = dateFormat.getMonth() + 1;
    let year = dateFormat.getFullYear();

    if (monthStart <= 9) newStartDate = `${year}-0${monthStart}-${day}`;
    else newStartDate = `${year}-${monthStart}-${day}`;

    return newStartDate
}