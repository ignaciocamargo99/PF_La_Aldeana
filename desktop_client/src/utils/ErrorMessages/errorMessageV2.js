import Swal from 'sweetalert2';

export default function errorMessageV2(text, title = 'Error') {
    Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonText: 'OK',
        showConfirmButton: true,
        didOpen: () => {
            if (Swal.isLoading()) {
                Swal.hideLoading()
            }
        },
    })
};