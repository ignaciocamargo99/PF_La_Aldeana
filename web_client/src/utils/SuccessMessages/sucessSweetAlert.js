import swal from 'sweetalert';

export default function successSweetAlert(message, title = 'Éxito') {

    return swal(title, message, 'success');
}