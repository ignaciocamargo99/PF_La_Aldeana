export const formatDateStart = (dateStart = null) => {
    let startDate;
    if (dateStart === null) {
        dateStart = new Date();
        let day = dateStart.getDate();
        let monthStart = dateStart.getMonth();
        let year = dateStart.getFullYear();

        if (monthStart <= 9) startDate = `${year}-0${monthStart}-${day}`;
        else startDate = `${year}-${monthStart}-${day}`;
    }
    else startDate = dateStart

    return startDate
}

export const formatDateEnd = (dateEnd = null) => {
    let endDate;
    if (dateEnd === null) {
        dateEnd = new Date();
        let day = dateEnd.getDate();
        let monthEnd = dateEnd.getMonth() + 1;
        let year = dateEnd.getFullYear();

        if (monthEnd <= 9) endDate = `${year}-0${monthEnd}-${day}`;
        else endDate = `${year}-${monthEnd}-${day}`;
    }
    else endDate = dateEnd;

    return endDate
}