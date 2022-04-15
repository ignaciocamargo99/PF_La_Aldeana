import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';
import moment from 'moment';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

export default function DeleteAssistancetButton(props) {
    let permissionsAccess = props.permissionsAccess;
    const handleDelete = (e) => confirmDelete(deleteEmployeeAssistance, dontDeleteAssistance, e);

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

    const dontDeleteAssistance = () => console.log('No se dio de baja la asistencia ' + props.assistance.employee);

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='deleteAssistanceButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='deleteAssistanceButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </BeShowed>
        </>
    );
}