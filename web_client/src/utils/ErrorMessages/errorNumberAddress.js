import swal from 'sweetalert';

export default function errorNumberAddress() {

    return swal("Atención", "No ha ingresado ningún número de calle valido para la franquicia", "warning");

}