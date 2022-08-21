import showMeMonth from "utils/ShowMeMonth/showMeMonth";

// dateFrom and dateTo in YYYY-MM format dateTo
const getSalariesRangeTitle = (dateFrom, dateTo) => {
    let dateFromAux = new Date(dateFrom);
    dateFromAux.setDate(dateFromAux.getDate() + 1);

    const yearFrom = dateFromAux.getFullYear();
    const monthFrom = showMeMonth(dateFromAux.getMonth());

    if (dateFrom === dateTo) {
        return `Salarios de ${monthFrom} del ${yearFrom}`;
    }

    let dateToAux = new Date(dateTo);
    dateFromAux.setDate(dateToAux.getDate() + 1);

    const yearTo = dateFromAux.getFullYear();
    const monthTo = showMeMonth(dateFromAux.getMonth());

    return `Salarios desde ${monthFrom} del ${yearFrom} hasta ${monthTo} del ${yearTo}`;
}

export default getSalariesRangeTitle;
