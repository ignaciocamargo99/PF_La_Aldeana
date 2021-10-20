import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';
import dateToString from "../../../utils/ConverterDate/dateToString";

const PORT = require('../../../config');

export default function DeleteAdvancesButton (props) {

    const handleDelete = (e) => confirmDelete(deleteEmployee, dontDeleteProduct, e);

    const date = dateToString(props.advances.date, true);

    const deleteEmployee = () => {
        console.log(date)
        Axios.delete(PORT() + `/api/advances?dniEmployee=${props.advances.nroDNI}&date=${date}`)
            .then((response) => {
                props.deleteEmployee(props.index);
                swal("Adelanto dado de baja", {
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

    const dontDeleteProduct = () => console.log('No se dio de baja al adelanto para ' + props.advances.nroDNI + ' ' + props.advances.last_name + ', ' + props.advances.name + ' en la fecha ' + date);

    return (
        <button id='deleteAdvancesButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}