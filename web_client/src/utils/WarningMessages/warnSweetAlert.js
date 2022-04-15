import swal from 'sweetalert';

export default function warnSweetAlert(message = '') {
    return swal("Atención", message, "warning");
};
