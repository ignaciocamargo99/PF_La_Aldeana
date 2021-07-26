import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from '../../../utils/confirmDelete';

export default function DeleteProductButton (props) {


    const handleDelete = (e) => {
        confirmDelete(deleteProduct, dontDeleteProduct, e);
    }

    const deleteProduct = () => console.log('delete');

    const dontDeleteProduct = () => console.log('No se elimino el producto ' + props.product.id_product + ' ' + props.product.name);

    return (
        <button id='deleteProductButton' type="button" className="btn btn-danger btn-sm px-3" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
    );
}