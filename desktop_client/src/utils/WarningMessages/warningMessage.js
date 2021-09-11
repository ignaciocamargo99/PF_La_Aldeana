import swal from 'sweetalert';
import '../../assets/SwalModal.css';

export default function warningCountProduct(typeMessage, message) {

    swal(typeMessage, message, "warning");

}