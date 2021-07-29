import swal from 'sweetalert';

export default function successPurchaseSupplies() {

    return swal("Atención", "La compra fue registrada exitosamente", "success")
        .then(() => {
            window.location.reload();
        })

}