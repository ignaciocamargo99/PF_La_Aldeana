import swal from 'sweetalert';

export default function successFranchise() {

    return swal("Atención", "Franquicia registrada correctamente", "success")
        .then(() => {
            window.location.reload();
        })

}