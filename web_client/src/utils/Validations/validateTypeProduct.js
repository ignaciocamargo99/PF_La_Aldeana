export default function validateDescription(combo){
    var message = "null";

    if (combo <= 0 ) {
        message = "El tipo de producto es un campo obligatorio";
    }

    return message;

}