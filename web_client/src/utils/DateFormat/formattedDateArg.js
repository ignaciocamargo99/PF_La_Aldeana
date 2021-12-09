export default function formattedDateArg (dateState, quantityMonth, quantityDay) {
    var year = dateState.getFullYear();
    var month;
    if (quantityMonth) {
        month = dateState.getMonth() + quantityMonth;
    } else month = dateState.getMonth() + 1;


    var day = dateState.getDate();
    if (quantityDay) {
        day = dateState.getDate() + quantityDay;
        if (day < 1){
            day = dateState.getDate();
            month --;
        }
    } else day = dateState.getDate();

    

    if (month > 12){
        month = month - 12;
        year ++;
    }
    if (month < 1){
        month = month + 12;
        year --;
    }
    var dateFormatted = day + "/" + month + "/" + year;

    if (dateFormatted.toString().length === 9) {
        if(month.toString().length === 1)
        {
            var monthFormatted = "0" + month;
            return dateFormatted = day + "/" + monthFormatted + "/" + year;
        }
        else if(day.toString().length === 1){
            var dayFormatted = "0" + day;
            return dateFormatted = dayFormatted + "/" + month + "/" + year;    
        }
    }
    else if(dateFormatted.toString().length === 8) {
        monthFormatted = "0" + month;
        dayFormatted = "0" + day;
        return dateFormatted = dayFormatted + "/" + monthFormatted + "/" + year;
    }

    return dateFormatted;
}

