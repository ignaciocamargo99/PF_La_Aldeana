import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";
import '../../../assets/Buttons.css';

const PORT = require('../../../config');

export default function DeleteProductButton (props) {

    const handleDelete = (e) => confirmDelete(deleteProduct, dontDeleteProduct, e);

    const deleteProduct = () => {
        Axios.put(PORT() + '/api/products/delete', {id_product: props.product.id_product})
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

    const dontDeleteProduct = () => console.log('No se elimino el producto ' + props.product.id_product + ' ' + props.product.name);

    return (
        <button id='deleteProductButton' type="button" className="sendDelete" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}