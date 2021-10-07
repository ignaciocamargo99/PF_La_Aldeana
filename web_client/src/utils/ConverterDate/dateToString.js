
export default function dateToString (date, notHour){
    let to = 19;
    let d = "";

    if (notHour) to = 11;

    for (let i = 0; i < to; i++){
        if(date.charAt(i) !== 'T'){
            d += date.charAt(i);
        } else {
            d += ' ';
        }
    }


    return d

}