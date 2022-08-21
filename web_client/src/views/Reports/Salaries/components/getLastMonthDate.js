
// returns previous month in YYYY-MM format
const getLastMonthDate = () => {
    // last day of previous month as Date
    let lastMonth = new Date();
    lastMonth.setDate(0);

    // YYYY
    const yearAsString = lastMonth.getFullYear().toString();

    // MM
    let monthAsString = lastMonth.getMonth().toString();
    if (monthAsString.length === 1) {
        monthAsString = `0${monthAsString}`;
    }

    return `${yearAsString}-${monthAsString}`
}

export default getLastMonthDate;