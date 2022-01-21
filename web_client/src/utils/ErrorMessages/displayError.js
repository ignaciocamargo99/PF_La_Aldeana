import swal from 'sweetalert';

const displayError = (text = 'Ha ocurrido un error.', title = '¡Lo sentimos!') => {
    return swal({
        icon: 'error',
        title: title,
        text: text
    })
};

export default displayError;