export default function validatePrice(price){
    var message = "null";

    console.log(price)

    if (price > 99999999) {
        message = "El precio es muy grande";
    } else if (price <= 0 || price == null) {
        message = "El precio minorista es un campo obligatorio";
    }

    return message;

}