export default function formattedDate (dateState, quantityMonth, quantityDay) {
    var year = dateState.getFullYear();
    var month;
    if (quantityMonth) month = dateState.getMonth() + quantityMonth;
    else month = dateState.getMonth() + 1;
    
    var day = dateState.getDate();
    if (quantityDay) {
        day = dateState.getDate() + quantityDay;
        if (day < 1){
            day = dateState.getDate();
            month --;
        }
    } else day = dateState.getDate();

    var dateFormatted = year + "-" + month + "-" + day;

    console.log(quantityDay)
    if (dateFormatted.toString().length === 9) {
        if(month.toString().length === 1)
        {
            var monthFormatted = "0" + month;
            console.log(dateFormatted)
            return dateFormatted = year + "-" + monthFormatted + "-" + day;
        }
        else if(day.toString().length === 1){
            var dayFormatted = "0" + day;
            console.log(dateFormatted)
            return dateFormatted = year + "-" + month + "-" + dayFormatted;    
        }
    }
    else if(dateFormatted.toString().length === 8) {
        monthFormatted = "0" + month;
        dayFormatted = "0" + day;
        console.log(dateFormatted)
        return dateFormatted = year + "-" + monthFormatted + "-" + dayFormatted;
    }

    console.log(dateFormatted)
    return dateFormatted;
}

