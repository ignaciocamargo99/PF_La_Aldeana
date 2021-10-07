import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteAssistancetButton (props) {

    const handleDelete = (e) => confirmDelete(deleteEmployeeAssistance, dontDeleteAssistance, e);

    const deleteEmployeeAssistance = () => {
        Axios.delete(PORT() + `/api/employeeAssistance/${props.assistance.employee}`)
            .then(() => {
                props.deleteAssistance(props.index);
                swal("Empleado dado de baja", {
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falló al dar de baja",
                    text: error,
                    icon: "warning",
                });
            });
    }

    const dontDeleteAssistance = () => console.log('No se dio de baja al empleado ' + props.assistance.employee);

    return (
        <button id='deleteAssistanceButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}