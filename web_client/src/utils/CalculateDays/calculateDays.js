export default function calculateDays(month, year){
    let days;
    if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11){
        days = 31;
    } else if(month === 3 || month === 5 || month === 8 || month === 10) {
        days = 30;
    } else if(year % 4 === 0){
        days = 29;
    } else {
        days = 28
    }
    return days;
}