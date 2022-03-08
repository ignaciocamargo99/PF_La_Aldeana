import swal from 'sweetalert';

export default function displayValidation(message) {

    return swal("Atención", message, "warning");

}