import Swal from 'sweetalert2';

const displaySuccess = (text, title = 'Éxito') => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: text
    })
};

export default displaySuccess;