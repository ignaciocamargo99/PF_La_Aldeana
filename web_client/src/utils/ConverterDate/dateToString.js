
export default function dateToString (date){
    let d = "";
    let stringDate = date

    for (let i = 0; i < 19; i++){
        if(date.charAt(i) !== 'T'){
            d += date.charAt(i);
        } else {
            d += ' ';
        }
    }


    return d

}