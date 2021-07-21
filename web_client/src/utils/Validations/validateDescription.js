export default function validateDescription(string){
    var message = "null";

    if (string.length >= 249) {
        message = "La descripción ingresada debe tener menos de 200 caracteres";
    } else if (string.length <= 0 || string == null) {
        message = "La descripción del producto es un campo obligatorio";
    }

    return message;

}