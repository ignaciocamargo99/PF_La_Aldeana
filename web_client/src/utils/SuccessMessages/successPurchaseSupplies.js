import swal from 'sweetalert';

export default function successPurchaseSupplies(message) {

    return swal("Atención", message, "success")
        .then(() => {
            window.location.reload();
        })

}