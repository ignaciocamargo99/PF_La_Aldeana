
export default function dateToString (date, notHour, notDay){

    let to = 19;
    let d = "";

    if (notHour) to = 10;

    if (notDay) to = 7;

    for (let i = 0; i < to; i++){
        if(date.charAt(i) !== 'T'){
            d += date.charAt(i);
        } else {
            d += ' ';
        }
    }


    return d

}