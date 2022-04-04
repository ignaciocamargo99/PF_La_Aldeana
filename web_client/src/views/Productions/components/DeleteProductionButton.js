import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteProductionButton(props) {

    const handleDelete = () => confirmDelete(deleteProduction);

    const deleteProduction = () => {
        Axios.delete(PORT() + `/api/production/${props.production.id_production}`)
            .then(() => {
                props.deleteProduction(props.index);
                swal("Elemento eliminado", {
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falla al eliminar elemento",
                    text: error,
                    icon: "error",
                });
            });
    }

    return (
        <button id='deleteProductButton' type="button" onClick={handleDelete} className="sendDelete"><FontAwesomeIcon icon={faMinus} /></button>
    );
}