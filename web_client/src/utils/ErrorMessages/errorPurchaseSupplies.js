import swal from 'sweetalert';

export default function errorPurchaseSupplies(message) {

    return swal("Atención", message, "warning");

}