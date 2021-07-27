import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';
import Axios from "axios";
import swal from "sweetalert";

const PORT = require('../../../config');

export default function DeleteProductButton (props) {


    const handleDelete = (e) => {
        confirmDelete(deleteProduct, dontDeleteProduct, e);
    }

    const deleteProduct = () => {
        
        Axios.put(PORT() + '/api/products/delete', {id_product: props.product.id_product})
            .then((response) => {
                console.log(response.data);
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
        <button id='deleteProductButton' type="button" className="btn btn-danger btn-sm px-3" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}