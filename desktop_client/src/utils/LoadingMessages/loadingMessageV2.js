import Swal from 'sweetalert2';

export function loadingMessageV2(title = 'Cargando...') {
    Swal.fire({
        title: title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        },
    })
};