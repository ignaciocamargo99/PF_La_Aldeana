import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from "common/BeShowed";

const PORT = require('../../../config');

export default function DeleteProductButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleDelete = async () => {
        const warningTitle = `¿Seguro que desea eliminar ${props.product.name}?`;
        const warningText = 'El producto ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if(deletionConfirmed) deleteProduct(props.product.id_product);
    }

    const deleteProduct = (id_product) => {
        Axios.delete(PORT() + `/api/products/${id_product}`)
            .then(() => {
                props.deleteProduct(props.index);
                swal("Producto dado de baja exitosamente", {
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falla al eliminar elemento",
                    text: error,
                    icon: "error",
                });
            });
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3} >
                <button id='deleteProductButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3} >
                <button id='deleteProductButton' type="button" disabled className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>

            </BeShowed>
        </>
    );
}