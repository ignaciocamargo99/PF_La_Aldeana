export default function formattedDate (dateState, quantityMonth, quantityDay) {
    var year = dateState.getFullYear();
    var month;
    
    if (quantityMonth) {
        month = dateState.getMonth() + quantityMonth;
    } else month = dateState.getMonth() + 1;
    
    var day = dateState.getDate();
    if (quantityDay) {
        day = dateState.getDate() + quantityDay;
    } else day = dateState.getDate();

    var dateFormatted = year + "-" + month + "-" + day;
    if (dateFormatted.toString().length === 9) {
        if(month.toString().length === 1)
        {
            var monthFormatted = "0" + month;
            return dateFormatted = year + "-" + monthFormatted + "-" + day;
        }
        else if(day.toString().length === 1){
            var dayFormatted = "0" + day;
            return dateFormatted = year + "-" + month + "-" + dayFormatted;    
        }
    }
    else if(dateFormatted.toString().length === 8) {
        monthFormatted = "0" + month;
        dayFormatted = "0" + day;
        return dateFormatted = year + "-" + monthFormatted + "-" + dayFormatted;
    }

    return dateFormatted;
}

