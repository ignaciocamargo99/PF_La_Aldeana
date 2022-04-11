import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';


const PORT = require('../../../config');

export default function DeleteUserButton(props) {

    const handleDelete = () => confirmDelete(deleteUser);

    const deleteUser = () => {
        Axios.put(PORT() + `/api/userPermission/${props.data.id_user}`)
            .then(() => {
                props.deleteUser(props.index);
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
        <button id='deleteUserButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}