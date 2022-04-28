import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

export default function DeleteFranchiseButton(props) {
    let permissionsAccess = props.permissionsAccess;
    
    const handleDelete = async () => {
        const warningTitle = `¿Seguro que desea eliminar ${props.franchise.name}?`;
        const warningText = 'La franquicia ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if(deletionConfirmed) deleteFranchise(props.franchise.id_franchise);
    }

    const deleteFranchise = (id_franchise) => {
        Axios.put(PORT() + `/api/franchise/${id_franchise}`)
            .then(() => {
                props.deleteFranchise(props.index);
                swal("Franquicia dada de baja exitosamente", {
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falló al dar de baja",
                    text: error,
                    icon: "error",
                });
            });
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='deleteFranchiseButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteFranchiseButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>

    );
}