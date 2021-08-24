import swal from 'sweetalert';

export default function validateWarning(value, typeMessage, message) {
    if (!value) {
       return swal(typeMessage, message, "warning");
    }
}