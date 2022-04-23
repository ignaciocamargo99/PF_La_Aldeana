import formattedDate from "../formattedDate";

export default function dateText (date, day, format){

    let dateFormat = format ? date : formattedDate(date);

    let year = parseInt(dateFormat.slice(0,-3));
    let monthD = parseInt(dateFormat.slice(5,-3));
    let dayD = parseInt(dateFormat.slice(8));

    let aux;

    if (monthD === 1) {
        aux = "Enero";
    } else if (monthD === 2) {
        aux = "Febrero";
    } else if (monthD === 3) {
        aux = "Marzo";
    } else if (monthD === 4) {
        aux = "Abril";
    } else if (monthD === 5) {
        aux = "Mayo";
    } else if (monthD === 6) {
        aux = "Junio";
    } else if (monthD === 7) {
        aux = "Julio";
    } else if (monthD === 8) {
        aux = "Agosto";
    } else if (monthD === 9) {
        aux = "Septiembre";
    } else if (monthD === 10) {
        aux = "Octubre";
    } else if (monthD === 11) {
        aux = "Noviembre";
    } else {
        aux = "Diciembre";
    }

    aux += ' del ' + year;

    if (!day) return aux;
    return dayD + ' de ' + aux;

}