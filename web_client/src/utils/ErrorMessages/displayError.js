  import Swal from 'sweetalert2';

const displayError = (text = 'Ha ocurrido un error.', title = '¡Lo sentimos!') => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    })
};

export default displayError;