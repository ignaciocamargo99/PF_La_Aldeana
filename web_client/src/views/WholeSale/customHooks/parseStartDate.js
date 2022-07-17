
export const parseStartDate = (strDate) => {
    let newStartDate;
    const dateFormat = new Date(strDate)
    let day = dateFormat.getDate();
    let monthStart = dateFormat.getMonth() + 1;
    let year = dateFormat.getFullYear();

    if (monthStart <= 9) newStartDate = `${year}-0${monthStart}-${day}`;
    else newStartDate = `${year}-${monthStart}-${day}`;

    return newStartDate
}