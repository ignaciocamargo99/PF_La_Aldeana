import swal from 'sweetalert';

export default function errorMessage(typeMessage, message) {

    return swal(typeMessage, message, "error")
}