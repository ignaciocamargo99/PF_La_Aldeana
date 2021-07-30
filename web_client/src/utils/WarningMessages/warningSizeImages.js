import swal from 'sweetalert';

export default function warningSizeImages() {

    return swal("Atención", "La imagen excede el tamaño máximo permitido (3 MB)", "warning");

}