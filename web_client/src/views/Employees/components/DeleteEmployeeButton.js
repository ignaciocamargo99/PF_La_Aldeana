import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

export default function DeleteEmployeeButton(props) {
    let permissionsAccess = props.permissionsAccess
    const handleDelete = async () => {
        const warningTitle = `¿Seguro que desea eliminar a ${props.employee.name}?`;
        const warningText = 'El empleado ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteEmployee(props.employee.dni);
    }

    const deleteEmployee = (dni) => {
        Axios.delete(PORT() + `/api/employees/${dni}`)
            .then(() => {
                props.deleteEmployee(props.index);
                swal("Empleado dado de baja", {
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
                <button id='deleteEmployeeButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteEmployeeButton' disabled type="button" className="disabledSendBtn" ><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}