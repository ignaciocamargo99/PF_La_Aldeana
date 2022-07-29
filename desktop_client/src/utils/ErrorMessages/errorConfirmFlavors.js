import swal from 'sweetalert';

export default function errorConfirmFlavors() {

    return swal("Atención", "Debe ingresar mínimamente 1 sabor en cada recipiente", "warning");

}