import swal from 'sweetalert';

export default function successTypeProduct(titleMessage, message, typeMessage) {

    return swal(titleMessage, message, typeMessage)
        .then(() => {
            window.location.reload();
        })

}