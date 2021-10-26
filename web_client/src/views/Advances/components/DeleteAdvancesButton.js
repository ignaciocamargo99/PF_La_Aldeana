import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';
import dateToString from "../../../utils/ConverterDate/dateToString";

const PORT = require('../../../config');

function confirmDelete(actionTrue) {

    return swal({
      title: "¿Seguro que desea cancelarlo?",
      text: "El elemento seleccionado ya no será visible para el personal de la empresa.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          actionTrue();
        }
      });
  }

export default function DeleteAdvancesButton (props) {

    const handleDelete = (e) => confirmDelete(deleteEmployee, dontDeleteProduct, e);

    const date = dateToString(props.advances.date, true);

    const deleteEmployee = () => {
        console.log(date)
        Axios.delete(PORT() + `/api/advances?dniEmployee=${props.advances.nroDNI}&date=${date}`)
            .then((response) => {
                if (response.data.Ok){
                    props.deleteEmployee(props.index);
                    swal("Adelanto cancelado correctamente", {
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

    const dontDeleteProduct = () => console.log('No se pudo cancelar el adelanto para ' + props.advances.nroDNI + ' ' + props.advances.last_name + ', ' + props.advances.name + ' en la fecha ' + date);

    return (
        <button id='deleteAdvancesButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}