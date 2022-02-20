import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';
import confirmDelete from '../../../utils/confirmDelete';

const PORT = require('../../../config');

export default function DeleteFranchiseButton(props) {

    const handleDelete = (e) => confirmDelete(deleteFranchise, e);

    const deleteFranchise = () => {
        Axios.put(PORT() + `/api/franchise/${props.franchise.id_franchise}`)
            .then(() => {
                props.deleteFranchise(props.index);
                swal("Franquicia dada de baja", {
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
        <button id='deleteFranchiseButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>

    );
}