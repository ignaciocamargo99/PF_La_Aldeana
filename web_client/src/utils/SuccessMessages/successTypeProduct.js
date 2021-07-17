import swal from 'sweetalert';

export default function successTypeProduct() {

    return swal("Atención", "Tipo de producto registrado exitosamente", "success")
        .then(() => {
            window.location.reload();
        })

}