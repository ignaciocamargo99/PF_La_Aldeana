import Swal from 'sweetalert2';
import Axios from "axios";
import displayError from 'utils/ErrorMessages/errorMessage';
import displaySuccess from 'utils/SuccessMessages/sucessSweetAlert2';

const PORT = require('../../../config');

export const handleDeleteClicked = async ({ name, idFlavorType, }) => {

    Swal.fire({
        title: 'Verificando...',
        didOpen: () => {
            Swal.showLoading();
        }
    });

    Axios.get(PORT() + `/api/flavors`, { params: { active: true, idFlavorType: idFlavorType, } })
        .then((response) => {
            const flavorsAssociated = response.data.flavors;

            if (flavorsAssociated?.length > 0) {
                const reason = flavorsAssociated.length === 1 ?
                    `existe 1 sabor correspondiente` :
                    `existen ${flavorsAssociated.length} sabores correspondientes`;

                const amount = flavorsAssociated.length === 1 ? `el sabor` : `ellos`;

                const warningText = `No podrá dar de baja la categoría '${name}' 
debido a que ${reason} a la misma. Deberá elegir una nueva categoría para ${amount}.`;

                Swal.fire({
                    title: "Atención",
                    text: warningText,
                    icon: "warning",
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                })
            } else {
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
        })
        .catch((error) => {
            console.log(error);
            displayError();
        });
}