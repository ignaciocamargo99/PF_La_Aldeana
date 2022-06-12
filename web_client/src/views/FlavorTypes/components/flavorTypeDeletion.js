import Swal from 'sweetalert2';
import Axios from "axios";
import displayError from 'utils/ErrorMessages/errorMessage';
import displaySuccess from 'utils/SuccessMessages/sucessSweetAlert2';

const PORT = require('../../../config');

export const handleDeleteClicked = async ({ name, idFlavorType, }) => {

    const warningText = `Si decide dar de baja la categoría '${name}' 
se darán de baja todos los sabores correspondientes a la misma. Esto no se podrá revertir.
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
        Axios.delete(PORT() + `/api/flavorTypes/${idFlavorType}`)
            .then(() => {
                displaySuccess(`'${name}' dada de baja exitosamente.`).then(() => {
                    window.location.reload();
                })
            })
            .catch((error) => {
                console.log(error);
                displayError();
            });
    }
}