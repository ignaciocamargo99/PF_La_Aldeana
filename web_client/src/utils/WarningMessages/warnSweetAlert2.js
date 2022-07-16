import Swal from 'sweetalert2';

export function warnSweetAlert2(title, text) {
    return Swal.fire({
        title: title || 'Atención',
        text: text,
        icon: "warning",
        confirmButtonText: 'OK',
        showConfirmButton: true,
    })
};