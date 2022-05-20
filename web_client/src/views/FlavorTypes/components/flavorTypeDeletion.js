import Swal from 'sweetalert2';

export const handleDeleteClicked = async ({ name }) => {

    const warningText = `Si decide dar de baja el tipo '${name}' 
se darán de baja todos los sabores correspondientes al mismo. Esto no se podrá revertir.
\n¿Desea continuar de todas formas?
`;

    const result = await Swal.fire({
        title: "Atención",
        text: warningText,
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
        // to do
    }
    else {
        // to do
    }
}