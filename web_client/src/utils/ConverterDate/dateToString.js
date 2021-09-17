
export default function dateToString (date){
    let d = "";

    for (let i = 0; i < 19; i++){
        if(date.charAt(i) !== 'T'){
            d += date.charAt(i);
        } else {
            d += ' ';
        }
    }


    return d

}