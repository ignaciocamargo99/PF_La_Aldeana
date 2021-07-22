export default function validateDescription(string){
    var message = "null";

    if (string.length >= 200) message = "La descripción ingresada debe tener menos de 200 caracteres";

    return message;

}