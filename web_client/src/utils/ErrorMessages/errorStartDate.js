import swal from 'sweetalert';

export default function errorStartDate() {

    return swal("Atención", "No ha ingresado ninguna fecha de inicio de actividades valida para la franquicia", "warning");

}