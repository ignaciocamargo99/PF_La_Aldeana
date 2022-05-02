import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';
import dateToString from "../../../utils/ConverterDate/dateToString";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";

const PORT = require('../../../config');

export default function DeleteAdvancesButton(props) {
    const handleDelete = async (e) => {
        const warningTitle = `¿Seguro que desea cancelar el adelanto seleccionado?`;
        const warningText = 'El producto ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteEmployee();
    }

    const date = dateToString(props.advances.date, true);

    const deleteEmployee = () => {
        Axios.delete(PORT() + `/api/advances?dniEmployee=${props.advances.nroDNI}&date=${date}`)
            .then((response) => {
                if (response.data.Ok) {
                    props.deleteEmployee(props.index);
                    swal("Adelanto cancelado exitosamente", {
                        icon: "success",
                    });
                } else {
                    swal({
                        title: "Falló al cancelar",
                        icon: "warning",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falló al cancelar",
                    text: error,
                    icon: "warning",
                });
            });
    }

    return (
        <button id='deleteAdvancesButton' type="button" className="btn btn-danger btnDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}