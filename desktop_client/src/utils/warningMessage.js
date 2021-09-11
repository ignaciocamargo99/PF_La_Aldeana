import swal from 'sweetalert';

export default function warningMessage(titleMessage, message, typeMessage) {

    return swal(titleMessage, message, typeMessage);

}