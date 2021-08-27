import swal from 'sweetalert';

export default function validateWarning(value) {
    if (!value) {
        return swal('Atención', 'Cargue uno o más helados a la lista', "warning");
    }
    else return;
}
