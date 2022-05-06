import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

export default function DeleteProductTypeButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleDelete = async () => {
        const warningTitle = `¿Seguro que desea eliminar ${props.data.name}?`;
        const warningText = 'El tipo de producto y TODOS los productos asociados ya no estarán disponibles.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteProductType(props.data.id_product_type);
    }

    const deleteProductType = (id_product_type) => {
        Axios.delete(PORT() + `/api/productTypes/${id_product_type}`)
            .then(() => {
                props.delete(props.index);
                swal("Elemento eliminado", {
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
            <BeShowed show={permissionsAccess === 3}>
                <button id='deleteProductTypeButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteProductTypeButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}