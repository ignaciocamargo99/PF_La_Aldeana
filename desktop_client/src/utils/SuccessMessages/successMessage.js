import swal from 'sweetalert';

export default function successMessage(typeMessage, message) {

    return swal(typeMessage, message, "success")
        .then(() => {
            window.location.reload();
        })

}