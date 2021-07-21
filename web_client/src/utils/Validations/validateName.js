export default function validateName(string){
    var message = "null";

    if (string.length >= 80) {
        message = "El nombre ingresado debe tener menos de 80 caracteres";
    } else if (string.length <= 0 || string == null) {
        message = "El nombre de producto es un campo obligatorio";
    }

    return message;

}