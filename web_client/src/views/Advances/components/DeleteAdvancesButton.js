import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteAdvancesButton (props) {

    const handleDelete = (e) => confirmDelete(deleteEmployee, dontDeleteProduct, e);

    const deleteEmployee = () => {
        console.log(props.advances.dni)
        Axios.put(PORT() + '/api/employee/delete', {dni: props.advances.dni})
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

    const dontDeleteProduct = () => console.log('No se dio de baja al empleado ' + props.advances.dni + ' ' + props.advances.name);

    return (
        <button id='deleteAdvancesButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}