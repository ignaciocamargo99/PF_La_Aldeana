import Swal from 'sweetalert2';

export default function warningMessageV2(text, title = 'Atención') {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        confirmButtonText: 'OK',
        showConfirmButton: true,
    })
}
