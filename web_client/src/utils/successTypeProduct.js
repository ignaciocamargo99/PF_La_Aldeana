import swal from 'sweetalert';

export default function successTypeProduct() {

    return swal("Atención", "Producto registrado exitosamente", "success")
        .then(() => {
            window.location.reload();
        })

}