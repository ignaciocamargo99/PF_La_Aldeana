import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import moment from 'moment';
import swal from "sweetalert";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

export default function DeleteAssistancetButton(props) {
    let permissionsAccess = props.permissionsAccess;
    const handleDelete = async (e) => {
        const warningTitle = `¿Seguro que desea eliminar la asistencia seleccionada?`;
        const warningText = 'La asistencia ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteEmployeeAssistance();
    }

    const deleteEmployeeAssistance = () => {
        let date_entry;
        if (PORT() !== '') date_entry = moment(props.assistance.date_entry).add(3, 'hours').format('YYYY/MM/DD HH:mm:ss')
        else date_entry = moment(props.assistance.date_entry).format('YYYY/MM/DD HH:mm:ss')

        Axios.delete(`${PORT()}/api/employeeAssistance/${props.assistance.employee}`, { data: { date_entry: date_entry } })
            .then(() => {
                props.deleteAssistance(props.index);
                swal("Asistencia eliminada", {
                    icon: "success",
                });
            })
            .catch((error) => {
                swal({
                    title: "Falló al dar de baja",
                    text: error,
                    icon: "warning",
                });
            });
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='deleteAssistanceButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteAssistanceButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}