import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteEmployeetButton (props) {

    const handleDelete = (e) => confirmDelete(deleteEmployee, dontDeleteProduct, e);

    const deleteEmployee = () => {
        console.log(props.employee.dni)
        Axios.delete(PORT() + `/api/employees/${props.employee.dni}`)
            .then((response) => {
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
                    icon: "warning",
                });
            });
    }

    const dontDeleteProduct = () => console.log('No se dio de baja al empleado ' + props.employee.dni + ' ' + props.employee.name);

    return (
        <button id='deleteEmployeeButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}