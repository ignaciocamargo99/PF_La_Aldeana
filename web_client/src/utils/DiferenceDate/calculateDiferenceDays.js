export const calculateDiferenceDays =  (dateInit,dateFinish) => {
    dateInit = new Date(dateInit);
    dateFinish = new Date(dateFinish);
    let day_as_milliseconds = 86400000;
    let diff_in_millisenconds = dateFinish - dateInit;
    let diff_in_days = diff_in_millisenconds / day_as_milliseconds;
    
    return diff_in_days
}