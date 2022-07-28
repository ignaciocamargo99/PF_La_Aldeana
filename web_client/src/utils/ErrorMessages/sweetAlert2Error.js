import Swal from 'sweetalert2';

export function sweetAlert2Error(title, text) {
    return Swal.fire({
        title: title || 'Error',
        text: text,
        icon: "error",
        confirmButtonText: 'OK',
        showConfirmButton: true,
    })
};