export const formatDateStart = (dateStart = null) => {
    let startDate;
    if (dateStart === null) {
        dateStart = new Date();
        let day = dateStart.getDate();
        let monthStart = dateStart.getMonth();
        let year = dateStart.getFullYear();

        if(day <= 9 && monthStart > 9) startDate= `${year}-${monthStart}-0${day}`;
        if(day > 9 && monthStart <= 9) startDate= `${year}-0${monthStart}-${day}`;
        if(day <= 9 && monthStart <= 9) startDate= `${year}-0${monthStart}-0${day}`;
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

        if(day <= 9 && monthEnd > 9) endDate= `${year}-${monthEnd}-0${day}`;
        if(day > 9 && monthEnd <= 9) endDate= `${year}-0${monthEnd}-${day}`;
        if(day <= 9 && monthEnd <= 9) endDate= `${year}-0${monthEnd}-0${day}`;
        else endDate = `${year}-${monthEnd}-${day}`;
    }
    else endDate = dateEnd;

    return endDate
}