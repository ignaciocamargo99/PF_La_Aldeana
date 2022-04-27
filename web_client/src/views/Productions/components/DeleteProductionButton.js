import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from "../../../common/BeShowed";

const PORT = require('../../../config');

export default function DeleteProductionButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleDelete = async () => {
        const warningTitle = `¿Seguro que desea eliminar la producción seleccionada?`;
        const warningText = 'La producción ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteProduction(props.production.id_production);
    }

    const deleteProduction = (id_production) => {
        Axios.delete(PORT() + `/api/production/${id_production}`)
            .then(() => {
                props.deleteProduction(props.index);
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
                <button id='deleteProductButton' type="button" onClick={handleDelete} className="sendDelete"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteProductButton' type="button" disabled className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}