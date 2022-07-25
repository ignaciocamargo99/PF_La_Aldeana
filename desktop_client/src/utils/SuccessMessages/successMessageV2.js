import Swal from 'sweetalert2';

export default function successMessageV2(text, title = 'Éxito') {
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        didOpen: () => {
            if (Swal.isLoading()) {
                Swal.hideLoading()
            }
        },
    })
};
