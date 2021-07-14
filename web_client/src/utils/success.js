import swal from 'sweetalert';

export default function success() {

    return swal("Atención", "Venta registrada exitosamente", "success")
        .then(() => {
            window.location.reload();
        })

}