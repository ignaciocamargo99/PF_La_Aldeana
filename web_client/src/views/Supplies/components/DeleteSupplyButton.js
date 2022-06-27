import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from 'common/BeShowed';

const PORT = require('../../../config');

export default function DeleteSupplyButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleDelete = async () => {
        console.log(props.data)
        const warningTitle = `¿Seguro que desea eliminar ${props.data.name}?`;
        const warningText = 'El insumo dejará de estár disponible en los productos activos, como así también dejará de ser visible para el personal de la empresa';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteSupply(props.data.id_supply);
    }

    const deleteSupply = (id_supply) => {
        Axios.put(PORT() + `/api/supply/${id_supply}`)
            .then(() => {
                props.delete(props.index);
                swal("Elemento eliminado", {
                    icon: "success",
                }).then(() => window.location.reload());
            })
            .catch((error) => {
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
                <button id='deleteSupplyButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteSupplyButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}