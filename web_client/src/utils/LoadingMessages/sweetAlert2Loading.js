import Swal from 'sweetalert2';

export function sweetAlert2Loading() {
    return Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        },
    })
};