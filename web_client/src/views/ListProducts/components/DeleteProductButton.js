import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteProductButton(props) {

    const handleDelete = () => confirmDelete(deleteProduct);

    const deleteProduct = () => {
        Axios.delete(PORT() + `/api/products/${props.product.id_product}`)
            .then((response) => {
                props.deleteProduct(props.index);
                swal("Elemento eliminado", {
                    icon: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: "Falla al eliminar elemento",
                    text: error,
                    icon: "warning",
                });
            });
    }

    return (
        <button id='deleteProductButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}