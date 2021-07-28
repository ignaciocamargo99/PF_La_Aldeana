export default function validateSupplier(string){
    var message = "null";

    if (string.length >= 100) {
        message = "El nombre de proveedor debe tener menos de 100 caracteres";
    } else if (string.length <= 0 || string == null) {
        message = "El nombre de proveedor es un campo obligatorio";
    }

    return message;

}