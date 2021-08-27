import swal from 'sweetalert';
import '../../assets/swalModal.css';

export default function warningCountProduct(typeMessage, message) {

    swal(typeMessage, message, "warning");

}